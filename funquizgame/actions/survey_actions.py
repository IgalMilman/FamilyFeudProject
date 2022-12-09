import json
import logging

from django.http.request import HttpRequest

from funquizgame.common.common_types import GAME_STATUSES
from funquizgame.models import Game, Survey, SurveyAnswer, SurveyQuestion


def upsert_survey(request: HttpRequest) -> dict:
    try:
        body = json.loads(request.body.decode("utf-8"))
        validation_results = Survey.validate_data(body)
        if not validation_results[0]:
            return {
                "status": 403,
                "error": "Validation error",
                "data": validation_results[1],
                "body": body,
            }
        survey: Survey = Survey.from_json(body, request.user)
        if not survey:
            return {'status': 403, 'error': 'Failed to create survey'}
        return {"status": 200, "data": survey.json()}
    except Exception as e:
        logging.error(e)
    return {"status": 400, "error": "There was an internal error"}


def upsert_survey_question(request: HttpRequest, survey_id: str) -> dict:
    try:
        body = json.loads(request.body.decode("utf-8"))
        survey = Survey.objects.get(unid=survey_id)
        validation_results = SurveyQuestion.validate_data(body)
        if not validation_results[0]:
            return {
                "status": 403,
                "error": "Validation error",
                "data": validation_results[1],
                "body": json.dumps(body),
            }
        survey_question: SurveyQuestion = SurveyQuestion.from_json(body, survey)
        return {"status": 200, "data": survey_question.json()}
    except Exception as e:
        logging.error(e)
    return {"status": 400, "error": "There was an internal error"}


def upsert_survey_answer(request: HttpRequest, game_id: str, survey_id: str) -> dict:
    try:
        body = json.loads(request.body.decode("utf-8"))
        game = Game.objects.get(unid=game_id)
        survey = Survey.objects.get(unid=survey_id)
        validation_results = SurveyAnswer.validate_data(body)
        if not validation_results[0]:
            return {
                "status": 403,
                "error": "Validation error",
                "data": validation_results[1],
                "body": body,
            }
        survey_answer: SurveyAnswer = SurveyAnswer.from_json(body, request.user, survey, game)
        print(survey_answer)
        return {"status": 200, "data": survey_answer.json()}
    except Exception as e:
        logging.error(e)
    return {"status": 400, "error": "There was an internal error"}
