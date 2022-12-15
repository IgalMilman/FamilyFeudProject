from typing import Dict, List
from uuid import uuid4

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.fields import CharField, SmallIntegerField
from funquizgame.common.common_functions import is_blank
from funquizgame.common.common_types import RequesterRole


class GameUser(AbstractUser):
    VIEWER_USERNAME = "v"
    TEAM_ONE_PARTICIPANT = "p1"
    TEAM_TWO_PARTICIPANT = "p2"

    id = models.AutoField("ID", primary_key=True, serialize=False)
    role = CharField(
        "User role",
        choices=RequesterRole.get_valid_choices(),
        null=False,
        blank=False,
        default=RequesterRole.VIEWER.value,
        max_length=3,
    )
    team = SmallIntegerField(
        "Team number",
        choices=[(1, "First team"), (2, "Second team")],
        null=True,
        default=None,
    )

    def json_full(self) -> Dict:
        result: Dict = self.json()
        result["role"] = self.role
        result["username"] = self.username
        return result

    def json(self) -> Dict:
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "active": self.user_is_active(),
            "team": self.team,
            "is_default": self.is_default(),
        }

    def __str__(self) -> str:
        return self.username

    def user_is_active(self) -> bool:
        return (
            not is_blank(self.first_name)
            and self.last_login is not None
            or self.is_default()
        )

    def is_default(self) -> bool:
        return self.username in [
                GameUser.VIEWER_USERNAME,
                GameUser.TEAM_ONE_PARTICIPANT,
                GameUser.TEAM_TWO_PARTICIPANT,
            ]

    @staticmethod
    def get_default_users() -> "List[GameUser]":
        viewer = GameUser.get_viewer_user()
        part1 = GameUser.get_participant_team_one()
        part2 = GameUser.get_participant_team_two()
        return [viewer, part1, part2]

    @staticmethod
    def get_viewer_user() -> "GameUser":
        instance, was_created = GameUser.objects.get_or_create(
            username=GameUser.VIEWER_USERNAME,
            role=RequesterRole.VIEWER.value,
            team=None,
        )
        if was_created:
            instance.set_password(uuid4().hex)
            instance.save()
        return instance

    @staticmethod
    def get_participant_team_one() -> "GameUser":
        instance, was_created = GameUser.objects.get_or_create(
            username=GameUser.TEAM_ONE_PARTICIPANT,
            role=RequesterRole.PARTICIPANT.value,
            team=1,
        )
        if was_created:
            instance.set_password(uuid4().hex)
            instance.save()
        return instance

    @staticmethod
    def get_participant_team_two() -> "GameUser":
        instance, was_created = GameUser.objects.get_or_create(
            username=GameUser.TEAM_TWO_PARTICIPANT,
            role=RequesterRole.PARTICIPANT.value,
            team=2,
        )
        if was_created:
            instance.set_password(uuid4().hex)
            instance.save()
        return instance

    @staticmethod
    def get_participant_for_team(teamnumber: int) -> "GameUser":
        if teamnumber == 1:
            return GameUser.get_participant_team_one()
        if teamnumber == 2:
            return GameUser.get_participant_team_two()
        return GameUser.get_viewer_user()
