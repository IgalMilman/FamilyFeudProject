import logging
from typing import List

from django.conf import settings
from django.db import models
from funquizgame.common.common_functions import generate_access_code
from .game import Game
from .users.game_user import GameUser


def default_access_code():
    return generate_access_code(settings.ACCESS_CODE_LENGTH)


class AccessCode(models.Model):
    id = models.AutoField('ID', primary_key=True, serialize=False)
    created_on = models.DateTimeField(
        "Created time", auto_now_add=True, null=False, blank=False)
    user = models.ForeignKey(
        GameUser, related_name='game_access_code', on_delete=models.CASCADE)
    access_code = models.CharField(
        'Access code', max_length=15, default=default_access_code, blank=False, null=False)
    game = models.ForeignKey(
        Game, related_name='user_access_code', on_delete=models.CASCADE)
    is_shown = models.BooleanField(
        'Is shown', blank=False, null=False, default=True)
    is_deleted = models.BooleanField('Is deleted', default=False)

    def validate_unique(self, exclude=None):
        super(AccessCode, self).validate_unique(exclude=exclude)
        if not self.is_deleted and AccessCode.objects.exclude(pk=self.pk).filter(access_code=self.access_code).exists():
            self.access_code = generate_access_code(len(self.access_code))
            self.validate_unique(exclude)

    @staticmethod
    def get_active_access_code(access_code: str) -> 'AccessCode':
        return AccessCode.objects.filter(access_code=access_code, is_deleted=False).order_by('-created_on').first()

    @staticmethod
    def get_or_create_codes_for_game(game: Game) -> 'List[AccessCode]':
        if game is None:
            return []
        default_users = GameUser.get_default_users()
        result = []
        for user in default_users:
            access_code = AccessCode.get_or_create_code_for_game_and_user(game, user)
            if access_code is not None:
                result.append(access_code)
        return result
    
    @staticmethod
    def get_or_create_code_for_game_and_user(game: Game, user: GameUser) -> 'AccessCode':
        if game is None or user is None:
            return None
        access_code, was_created = AccessCode.objects.get_or_create(
                user=user, game=game)
        if was_created:
            access_code.save()
        if access_code.is_deleted:
            access_code.is_deleted = False
            access_code.save()
        return access_code
        

    @staticmethod
    def close_access_codes(game: Game) -> bool:
        if game is None:
            return True
        result = True
        access_codes = game.user_access_code.filter(
            game=game, is_deleted=False)
        for access_code in access_codes:
            try:
                access_code.is_deleted = True
                access_code.save()
            except Exception as e:
                logging.error(
                    'Error while deprecating access codes %s', e)
                result = False
        return result
