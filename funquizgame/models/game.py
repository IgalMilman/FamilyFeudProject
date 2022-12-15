import logging
from typing import Dict, Tuple
import uuid

from django.db import models
from django.db.models.deletion import SET_NULL
from django.urls import reverse

from funquizgame.common.common_types import GAME_STATUSES, RequesterRole
from .users.game_user import GameUser


class Game(models.Model):
    unid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True
    )
    created_by = models.ForeignKey(GameUser, null=True, on_delete=SET_NULL)
    created_on = models.DateTimeField(
        "Created time", auto_now_add=True, null=False, blank=False
    )
    started_on = models.DateTimeField(
        "Starting time", auto_now_add=False, null=True, blank=True
    )
    ended_on = models.DateTimeField(
        "Ending time", auto_now_add=False, null=True, blank=True
    )
    status = models.TextField(
        "Current game status",
        choices=GAME_STATUSES.get_valid_choices(),
        null=False,
        blank=False,
        default=GAME_STATUSES.BEGINNING.value,
    )
    current_question = models.UUIDField(
        "Current question", editable=True, unique=False, null=True, blank=True
    )
    current_survey = models.UUIDField(
        "Current survey", editable=True, unique=False, null=True, blank=True
    )
    title = models.CharField("Game Title", max_length=60)

    def get_teams(self, user:GameUser, role: RequesterRole) -> Tuple[Dict, bool]:
        teams = []
        is_captain = False
        for sec in self.team_set.all().order_by("number"):
            data = sec.json(role)
            data['captain'] = sec.captain == user
            is_captain = is_captain or (sec.captain == user)
            teams.append(data)
        return teams, is_captain

    def json(self, user:GameUser, role: RequesterRole) -> Dict:
        [teams, is_captain] = self.get_teams(user, role)
        return {
            "id": self.unid,
            "started": self.started_on,
            "status": self.status,
            "current_question": self.current_question,
            "current_survey": self.current_survey,
            "teams": teams,
            "active_question": self.get_active_question(role),
            "title": self.title,
            "viewer_access_code": self.get_access_code_for_viewer(),
            "team_on": user.team,
            "is_captain": is_captain
        }

    def json_short(self, role: RequesterRole) -> Dict:
        if not role.is_host():
            return None
        return {
            "id": self.unid,
            "gameStatus": self.status,
            "url": reverse("active_game", args=[self.unid]),
            "title": self.title,
        }

    def get_access_code_for_viewer(self) -> str:
        from funquizgame.models import GameUserParticipation

        access_code: GameUserParticipation = GameUserParticipation.get_or_create_code_for_game_and_user(
            self, GameUser.get_viewer_user()
        )
        if access_code is None:
            return None
        return access_code.access_code

    def get_active_question(self, role: RequesterRole) -> Dict:
        try:
            from funquizgame.models import RealQuestion

            question = RealQuestion.objects.filter(unid=self.current_question).first()
            return None if question is None else question.json(role)
        except Exception as e:
            logging.error(e)
        return None
