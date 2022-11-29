import uuid
from datetime import datetime, timedelta, timezone
from urllib.parse import quote, unquote

import pytz
from django.conf import settings
from django.contrib.auth.models import User
from django.core.files.storage import DefaultStorage
from django.db import models
from django.urls import reverse
from funquizgame.models.game import Game

class RealDataAbstract(models.Model):
    unid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, null=False, blank=False, db_index=True)
    