import uuid
from datetime import datetime, timedelta, timezone
from urllib.parse import quote, unquote

import pytz
from django.conf import settings
from django.contrib.auth.models import User
from django.core.files.storage import DefaultStorage
from django.db import models
from django.urls import reverse
from funquizgame.data_getters.common_types import RequesterRole
from funquizgame.models.game import Game

class Team(models.Model):
    unid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, null=False, blank=False)
    name = models.CharField("Team Name*", max_length=60, null=False, blank=False)
    number = models.SmallIntegerField("Team Number", null=False, blank=False, default=0)
    points = models.IntegerField("Number of Points", null=False, blank=False, default=0)

    def json(self, role: RequesterRole):
        return {
            "id": self.unid,
            "name": self.name,
            "number": self.number,
            "points": self.points
        }