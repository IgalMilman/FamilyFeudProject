import uuid

from django.db import models

from funquizgame.common.common_types import RequesterRole

from .game import Game
from .game_user_participation import GameUserParticipation
from .users import GameUser


class Team(models.Model):
    unid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True
    )
    game = models.ForeignKey(Game, on_delete=models.CASCADE, null=False, blank=False)
    name = models.CharField("Team Name*", max_length=60, null=False, blank=False)
    number = models.SmallIntegerField("Team Number", null=False, blank=False, default=0)
    points = models.IntegerField("Number of Points", null=False, blank=False, default=0)
    captain = models.ForeignKey(GameUser, on_delete=models.SET_NULL, null=True, related_name='captain_on_teams')

    def json(self, role: RequesterRole):
        return {
            "id": self.unid,
            "name": self.name,
            "number": self.number,
            "points": self.points,
            "access_code": self.get_access_code(role),
        }

    def get_access_code(self, role: RequesterRole) -> str:
        if not role.is_host():
            return None
        access_code: GameUserParticipation = GameUserParticipation.get_or_create_code_for_game_and_user(
            self.game, GameUser.get_participant_for_team(self.number)
        )
        if access_code is None:
            return None
        return access_code.access_code
