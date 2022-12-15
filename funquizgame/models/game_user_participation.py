import logging
from typing import List
from uuid import uuid4

from django.conf import settings
from django.db import models

from funquizgame.common.common_types import RequesterRole
from funquizgame.common.common_functions import generate_access_code

from .game import Game
from .users.game_user import GameUser


def default_access_code():
    return generate_access_code(settings.ACCESS_CODE_LENGTH)


class GameUserParticipation(models.Model):
    id = models.AutoField('ID', primary_key=True, serialize=False)
    created_on = models.DateTimeField(
        "Created time", auto_now_add=True, null=False, blank=False)
    user = models.ForeignKey(
        GameUser, related_name='game_participation', on_delete=models.CASCADE)
    access_code = models.CharField(
        'Access code', max_length=15, default=default_access_code, blank=False, null=True)
    game = models.ForeignKey(
        Game, related_name='user_participation', on_delete=models.CASCADE)
    is_shown = models.BooleanField(
        'Is shown', blank=False, null=False, default=True)
    access_code_is_disabled = models.BooleanField('Is disabled', default=False)

    def validate_unique(self, exclude=None):
        super(GameUserParticipation, self).validate_unique(exclude=exclude)
        if not self.access_code_is_disabled and GameUserParticipation.objects.exclude(pk=self.pk).filter(access_code=self.access_code).exists():
            self.access_code = generate_access_code(len(self.access_code))
            self.validate_unique(exclude)
    
    def json(self) -> dict:
        return {
            'id': self.id,
            'is_shown': self.is_shown,
            'access_code': self.access_code
        }
    
    def json_with_user_data(self) -> dict:
        result = self.json()
        result['is_disabled'] = self.access_code_is_disabled
        result['user'] = self.user.json()
        return result

    @staticmethod
    def get_active_access_code(access_code: str) -> 'GameUserParticipation':
        return GameUserParticipation.objects.filter(access_code=access_code, access_code_is_disabled=False).order_by('-created_on').first()

    @staticmethod
    def get_or_create_codes_for_game_for_default_users(game: Game) -> 'List[GameUserParticipation]':
        if game is None:
            return []
        default_users = GameUser.get_default_users()
        result = []
        for user in default_users:
            access_code = GameUserParticipation.get_or_create_code_for_game_and_user(game, user)
            if access_code is not None:
                result.append(access_code)
        return result
    
    @staticmethod
    def create_codes_and_users_for_game(game: Game, number_of_users: int) -> 'List[GameUserParticipation]':
        if game is None:
            return []
        result: 'List[GameUserParticipation]' = []
        for i in range(number_of_users):
            user: GameUser = GameUser.objects.create(username=str(uuid4()), role=RequesterRole.VIEWER_PARTICIPANT.value, password=str(uuid4()))
            participation_object: GameUserParticipation = GameUserParticipation.get_or_create_code_for_game_and_user(game, user)
            result.append(participation_object)
        return result

    
    @staticmethod
    def get_or_create_code_for_game_and_user(game: Game, user: GameUser) -> 'GameUserParticipation':
        if game is None or user is None:
            return None
        access_code, was_created = GameUserParticipation.objects.get_or_create(
                user=user, game=game)
        if was_created:
            access_code.save()
        if access_code.access_code_is_disabled:
            access_code.access_code_is_disabled = False
            access_code.save()
        return access_code
        

    @staticmethod
    def close_access_codes(game: Game) -> bool:
        if game is None:
            return True
        result = True
        access_codes = GameUserParticipation.get_active_access_codes_for_game(game)
        for access_code in access_codes:
            try:
                access_code.access_code_is_disabled = True
                access_code.save()
            except Exception as e:
                logging.error(
                    'Error while deprecating access codes %s', e)
                result = False
        return result

    @staticmethod
    def get_active_access_codes_for_game(game: Game) -> List['GameUserParticipation']:
        return game.user_participation.filter(access_code_is_disabled=False)

    @staticmethod
    def get_all_codes_and_users_for_game(game: Game) -> List[dict]:
        if game is None:
            return []
        all_participations = game.user_participation.all()
        result:List[dict] = []
        for participation in all_participations:
            result.append(participation.json_with_user_data())
        return result
    
    @staticmethod
    def get_active_users_for_game(game: Game) -> List[GameUser]:
        if game is None:
            return []
        all_participations = game.user_participation.all()
        result: List[dict] = []
        for participation in all_participations:
            if participation.user.user_is_active():
                result.append(participation.user)
        return result
