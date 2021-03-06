import logging
import uuid
from django.db.models.deletion import SET_NULL

from django.urls import reverse
from django.db import models
from funquizgame.common.common_types import GAME_STATUSES, RequesterRole
from funquizgame.models.users.game_user import GameUser


class Game(models.Model):
    unid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    created_by = models.ForeignKey(GameUser, null=True, on_delete=SET_NULL)
    created_on = models.DateTimeField(
        "Created time", auto_now_add=True, null=False, blank=False)
    started_on = models.DateTimeField(
        "Starting time", auto_now_add=False, null=True, blank=True)
    ended_on = models.DateTimeField(
        "Ending time", auto_now_add=False, null=True, blank=True)
    status = models.TextField(
        "Current game status", choices=GAME_STATUSES.get_valid_choices(), null=False, blank=False, default=GAME_STATUSES.BEGINNING.value)
    current_question = models.UUIDField(
        "Current question", editable=True, unique=False, null=True, blank=True)
    title = models.CharField('Game Title', max_length=60)

    def get_teams(self, role: RequesterRole) -> dict:
        result = []
        for sec in self.team_set.all().order_by('number'):
            result.append(sec.json(role))
        return result

    def json(self, role: RequesterRole) -> dict:
        return {
            'id': self.unid,
            'started': self.started_on,
            'status': self.status,
            'current_question': self.current_question,
            'teams': self.get_teams(role),
            'active_question': self.get_active_question(role),
            'title': self.title,
            'viewer_access_code': self.get_access_code_for_viewer()
        }

    def json_short(self, role: RequesterRole) -> dict:
        if not role.is_host():
            return None
        return {
            'id': self.unid,
            'gameStatus': self.status,
            'url': reverse('active_game', args=[self.unid]),
            'title': self.title

        }

    def get_access_code_for_viewer(self) -> str:
        from funquizgame.models.access_code import AccessCode
        access_code: AccessCode = AccessCode.get_or_create_code_for_game_and_user(
            self, GameUser.get_viewer_user())
        if access_code is None:
            return None
        return access_code.access_code

    def get_active_question(self, role: RequesterRole) -> dict:
        try:
            from funquizgame.models.real_question import RealQuestion
            question = RealQuestion.objects.filter(
                unid=self.current_question).first()
            return None if question is None else question.json(role)
        except Exception as e:
            logging.error(e)
        return None
