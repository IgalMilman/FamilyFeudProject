import uuid
import logging
from datetime import datetime, timedelta, timezone
from urllib.parse import quote, unquote

import pytz
from django.conf import settings
from django.contrib.auth.models import User
from django.core.files.storage import DefaultStorage
from django.db import models
from django.urls import reverse

from funquizgame.data_getters.common_types import GAME_STATUSES, RequesterRole


class Game(models.Model):
    unid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    created_on = models.DateTimeField(
        "Created time", auto_now_add=True, null=False, blank=False)
    started_on = models.DateTimeField(
        "Starting time", auto_now_add=False, null=True, blank=True)
    ended_on = models.DateTimeField(
        "Ending time", auto_now_add=False, null=True, blank=True)
    status = models.TextField(
        "Current game status", choices=GAME_STATUSES.CHOICES, null=False, blank=False, default=GAME_STATUSES.BEGINNING)
    current_question = models.UUIDField(
        "Current question", editable=True, unique=False, null=True, blank=True)

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
            'active_question': self.get_active_question(role)
        }

    def get_active_question(self, role: RequesterRole) -> dict:
        try:
            from funquizgame.models.real_question import RealQuestion
            question = RealQuestion.objects.filter(unid=self.current_question).first()
            return None if question is None else question.json(role)
        except Exception as e:
            logging.error(e)
        return None
