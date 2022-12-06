import logging
from typing import List

from django.db.models.query_utils import Q

from funquizgame.common.common_types import RequesterRole
from funquizgame.models import Game, GameUser, Survey


def get_survey(survey_id: str) -> dict:
    try:
        survey = Survey.objects.get(unid=survey_id)
        if survey is not None:
            return survey.json()
    except Exception as e:
        logging.error(e)
    return {}


def get_survey_with_answers(survey_id: str, game_id: str):
    try:
        survey = Survey.objects.get(unid=survey_id)
        if survey is None:
            return {}
        return survey.json_with_answers(Game.objects.get(unid=game_id))
    except Exception as e:
        logging.error(e)
    return {}


def get_all_available_surveys(role: RequesterRole, user: GameUser) -> list[dict]:
    if not role.is_host():
        return []
    try:
        surveys: List[Survey] = Survey.objects.filter(
            Q(created_by=user) | Q(created_by=None)
        )
        if surveys is not None:
            return [survey.json_short() for survey in surveys]
    except Exception as e:
        logging.error(e)
    return []
