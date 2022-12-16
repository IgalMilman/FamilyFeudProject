import logging
from typing import Dict, List

from django.db.models.query_utils import Q

from funquizgame.common.common_types import RequesterRole
from funquizgame.models import Game, GameUser, Survey


def get_survey(survey_id: str) -> Dict:
    try:
        survey = Survey.objects.get(unid=survey_id)
        if survey is not None:
            return survey.json()
    except Exception as e:
        logging.error(e)
    return {}


def get_survey_for_game(survey_id: str, game_id: str, user: GameUser) -> Dict:
    try:
        game: Game = Game.objects.filter(unid=game_id).first()
        survey: Survey = Survey.objects.filter(unid=survey_id).first()
        if survey is None:
            return {}
        result: Dict = survey.json()
        try:

            result['answers'] = [answer.json() for answer in survey.survey_answers.filter(game=game, created_by=user)]
        except Exception as e:
            pass
    except Exception as e:
        logging.error(e)
    return result


def get_survey_with_answers(survey_id: str, game_id: str):
    try:
        survey = Survey.objects.get(unid=survey_id)
        if survey is None:
            return {}
        return survey.json_with_answers(Game.objects.get(unid=game_id))
    except Exception as e:
        logging.error(e)
    return {}


def get_all_available_surveys(role: RequesterRole, user: GameUser) -> List[Dict]:
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
