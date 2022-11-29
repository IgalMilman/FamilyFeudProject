import json
import logging
from datetime import datetime

import pytz
from django.http.request import HttpRequest

from funquizgame.common.common_exceptions import ValidationException
from funquizgame.common.common_types import RequesterRole
from funquizgame.models import (AnswerData, GameUser, QuestionData, RealAnswer,
                                RealQuestion, Team)


def give_answer(
    request: HttpRequest, role: RequesterRole, game_id, questionid: str
) -> dict:
    result = {}
    try:
        body = json.loads(request.body.decode("utf-8"))
        value = body.get("value", None)
        teamid = body.get("teamid", None)
        answerid = body.get("answerid", None)
        reveal = body.get("reveal", False)
        if value is None and answerid is None:
            result["status"] = 401
            result["error"] = "Need either an answerid or a value"
            result["body"] = body
            return result
        question = RealQuestion.objects.get(unid=questionid)
        team = None
        if teamid is not None:
            team = Team.objects.get(unid=teamid)
        answer: AnswerData = None
        if answerid is not None:
            answer = AnswerData.objects.get(unid=answerid)
        real_answer: RealAnswer = RealAnswer.get_real_answer_object(
            team, question, answer
        )
        if (
            real_answer.team is not None
            and real_answer.team != team
            and answer is not None
            and answer.points_value is not None
        ):
            previous_team: Team = real_answer.team
            previous_team.points = previous_team.points - answer.points_value
            previous_team.save()
        if (
            team is not None
            and answer is not None
            and answer.points_value is not None
            and real_answer.team != team
        ):
            team.points = team.points + answer.points_value
            team.save()
        real_answer.value = value
        real_answer.team = team
        if reveal:
            real_answer.is_shown = True
        if real_answer.answer_created is None:
            real_answer.answer_created = datetime.now(pytz.utc)
        real_answer.save()
        result["status"] = 200
        result["answer"] = real_answer.json(role)
    except Exception as e:
        logging.error(e)
    return result


def reveal_question(
    request: HttpRequest, role: RequesterRole, game_id, questionid: str
) -> dict:
    result = {}
    try:
        question = RealQuestion.objects.get(unid=questionid)
        if question.question_start is None:
            question.question_start = datetime.now(pytz.utc)
        question.is_shown = True

        question.save()
        result["status"] = 200
        result["question"] = question.json(role)
        return result
    except Exception as e:
        logging.error(e)
    result["status"] = 401
    result["error"] = f"Could not find the question with id {questionid}"
    return result


def complete_question(
    request: HttpRequest, role: RequesterRole, game_id, questionid: str
) -> dict:
    result = {}
    try:
        question: RealQuestion = RealQuestion.objects.get(unid=questionid)
        question.is_complete = True
        question.save()
        for realanswer in question.get_all_real_answers(role):
            realanswer.is_shown = True
            realanswer.save()
        result["status"] = 200
        result["question"] = question.json(role)
        return result
    except Exception as e:
        logging.error(e)
    result["status"] = 401
    result["error"] = f"Could not find the question with id {questionid}"
    return result


def reveal_answer(
    request: HttpRequest, role: RequesterRole, game_id, answerid: str
) -> dict:
    result = {}
    try:
        answer: RealAnswer = RealAnswer.objects.get(unid=answerid)
        answer.is_shown = True
        if answer.team is not None:
            previous_team: Team = answer.team
            previous_team.points = (
                previous_team.points
                - answer.additional_points
                - answer.answer_data.points_value
            )
            previous_team.save()
            answer.team = None
        answer.save()
        result["status"] = 200
        result["answer"] = answer.json(role)
        return result
    except Exception as e:
        logging.error(e)
    result["status"] = 401
    result["error"] = f"Could not find the answer with id {answerid}"
    return result


def upsert_question_handler(request: HttpRequest) -> dict:
    try:
        body: dict = json.loads(request.body.decode("utf-8"))
        return upsert_question_from_json(body, request.user)
    except ValidationException as e:
        return {
            "status": 403,
            "error": e.create_message(),
            "error_fields": e.fields_error_json(),
        }
    except Exception as e:
        logging.error(e)
    return {"status": 403, "error": "Could not create/update the question"}


def upsert_question_from_json(question_json: dict, user: GameUser) -> dict:
    result = QuestionData.from_json(question_json, user)
    if result is None:
        return {
            "status": 403,
            "error": "Could not create/update the question",
            "body": question_json,
        }
    return {"status": 200, "data": result.json(RequesterRole.HOST)}
