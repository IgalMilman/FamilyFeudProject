from typing import List
from uuid import uuid4

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.fields import CharField, SmallIntegerField
from funquizgame.common.common_enums import RequesterRole


class GameUser(AbstractUser):
    VIEWER_USERNAME = "v"
    TEAM_ONE_PARTICIPANT = "p1"
    TEAM_TWO_PARTICIPANT = "p2"

    id = models.AutoField('ID', primary_key=True, serialize=False)
    role = CharField('User role', choices=RequesterRole.get_valid_choices(), null=False,
                     blank=False, default=RequesterRole.VIEWER.value, max_length=3)
    team = SmallIntegerField('Team number', choices=[(
        1, 'First team'), (2, 'Second team')], null=True, default=None)

    def __str__(self):
        return self.username

    @staticmethod
    def get_default_users()->'List[GameUser]':
        viewer = GameUser.get_viewer_user()
        part1 = GameUser.get_participant_team_one()
        part2 = GameUser.get_participant_team_two()
        return [viewer, part1, part2]
    
    @staticmethod
    def get_viewer_user()->'GameUser':
        instance, was_created = GameUser.objects.get_or_create(username=GameUser.VIEWER_USERNAME, role=RequesterRole.VIEWER.value, team=None)
        if was_created:
            instance.set_password(uuid4().hex)
            instance.save()
        return instance

    @staticmethod
    def get_participant_team_one()->'GameUser':
        instance, was_created = GameUser.objects.get_or_create(username=GameUser.TEAM_ONE_PARTICIPANT, role=RequesterRole.PARTICIPANT.value, team=1)
        if was_created:
            instance.set_password(uuid4().hex)
            instance.save()
        return instance

    @staticmethod
    def get_participant_team_two()->'GameUser':
        instance, was_created = GameUser.objects.get_or_create(username=GameUser.TEAM_TWO_PARTICIPANT, role=RequesterRole.PARTICIPANT.value, team=2)
        if was_created:
            instance.set_password(uuid4().hex)
            instance.save()
        return instance

    @staticmethod
    def get_participant_for_team(teamnumber:int)->'GameUser':
        if teamnumber==1:
            return GameUser.get_participant_team_one()
        if teamnumber==2:
            return GameUser.get_participant_team_two()
        return GameUser.get_viewer_user()
