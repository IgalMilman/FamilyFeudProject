import json
import logging
from datetime import datetime

import pytz
from django.core import serializers
from django.http.request import HttpRequest
from django.views.decorators.csrf import csrf_exempt
from funquizgame.data_getters.common_types import RequesterRole
from funquizgame.models.answer_data import AnswerData
from funquizgame.models.question_data import QuestionData
from funquizgame.models.real_answer import RealAnswer
from funquizgame.models.real_question import RealQuestion
from funquizgame.models.team import Team


def give_answer(request: HttpRequest, role: RequesterRole, questionid: str) -> dict:
    result = {}
    try:
        body = json.loads(request.body.decode('utf-8'))
        value = body.get('value', None)
        teamid = body.get('teamid', None)
        answerid = body.get('answerid', None)
        reveal = body.get('reveal', False)
        if value is None and answerid is None:
            result['status'] = 401
            result['error'] = 'Need either an answerid or a value'
            result['body'] = body
            return result
        question = RealQuestion.objects.get(unid=questionid)
        team = None
        if teamid is not None:
            team = Team.objects.get(unid=teamid)
        answer: AnswerData = None
        if answerid is not None:
            answer = AnswerData.objects.get(unid=answerid)
        real_answer: RealAnswer = RealAnswer.get_real_answer_object(
            team, question, answer)
        if real_answer.team is not None and real_answer.team != team and answer is not None and answer.points_value is not None:
            previous_team: Team = real_answer.team
            previous_team.points = previous_team.points - answer.points_value
            previous_team.save()
        if team is not None and answer is not None and answer.points_value is not None and real_answer.team != team:
            team.points = team.points + answer.points_value
            team.save()
        real_answer.value = value
        real_answer.team = team
        if reveal:
            real_answer.is_shown = True
        real_answer.save()
        result['status'] = 200
        result['answer'] = real_answer.json(role)
    except Exception as e:
        logging.error(e)
    return result


def reveal_question(request: HttpRequest, role: RequesterRole, questionid: str) -> dict:
    result = {}
    try:
        question = RealQuestion.objects.get(unid=questionid)
        question.is_shown = True
        question.save()
        result['status'] = 200
        result['question'] = question.json(role)
        return result
    except Exception as e:
        logging.error(e)
    result['status'] = 401
    result['error'] = f'Could not find the question with id {questionid}'
    return result


def complete_question(request: HttpRequest, role: RequesterRole, questionid: str) -> dict:
    result = {}
    try:
        question: RealQuestion = RealQuestion.objects.get(unid=questionid)
        question.is_complete = True
        question.save()
        for realanswer in question.get_all_real_answers(role):
            realanswer.is_shown = True
            realanswer.save()
        result['status'] = 200
        result['question'] = question.json(role)
        return result
    except Exception as e:
        logging.error(e)
    result['status'] = 401
    result['error'] = f'Could not find the question with id {questionid}'
    return result


def reveal_answer(request: HttpRequest, role: RequesterRole, answerid: str) -> dict:
    result = {}
    try:
        answer = RealAnswer.objects.get(unid=answerid)
        answer.is_shown = True
        answer.save()
        result['status'] = 200
        result['answer'] = answer.json(role)
        return result
    except Exception as e:
        logging.error(e)
    result['status'] = 401
    result['error'] = f'Could not find the answer with id {answerid}'
    return result


def create_question_handler(request: HttpRequest) -> dict:
    try:
        body: dict = json.loads(request.body.decode('utf-8'))
        return create_question_from_json(body)
    except Exception as e:
        logging.error(e.with_traceback())
    return {
        'status': 403,
        'error': 'Could not create the question'
    }


def create_question_from_json(question_json:dict)->dict:
    result = QuestionData.from_json(question_json)
    if result is None:
        return {
            'status': 401,
            'error': 'Could not create the question',
            'body': question_json
        }
    return {
        'status':200,
        'question': result.json(RequesterRole.HOST)
    }
