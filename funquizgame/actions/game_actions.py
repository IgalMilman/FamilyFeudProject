from datetime import datetime
import json
import logging
import pytz
from django.http.request import HttpRequest
from funquizgame.common.common_types import GAME_STATUSES
from funquizgame.common.common_functions import is_blank
from funquizgame.models.access_code import AccessCode

from funquizgame.models.game import Game
from funquizgame.models.real_answer import RealAnswer
from funquizgame.models.team import Team
from funquizgame.models.real_question import RealQuestion
from funquizgame.models.question_data import QuestionData


def create_game(request: HttpRequest, role: str) -> dict:
    try:
        body = json.loads(request.body.decode('utf-8'))
        game_name = body.get('title', None)
        if  is_blank(game_name):
            return {
                'status': 400,
                'error': 'You must provide a title for the game'
            }
        game:Game = Game.objects.create(title=game_name)
        Team.objects.get_or_create(game=game, number=1)
        Team.objects.get_or_create(game=game, number=2)
        AccessCode.get_or_create_codes_for_game(game)
        result = {
            'data': game.json_short(role),
            'status': 200
        }
        return result
    except Exception as e:
        logging.error(e)
    return {
        'status': 400,
        'error': 'There was an internal error'
    }


def get_or_create_game(request: HttpRequest, role: str) -> dict:
    try:
        games = Game.objects.exclude(
            status=GAME_STATUSES.ENDING).order_by('-started_on')
        if games is not None and len(games) > 0:
            return {'game': games.first().json(role),
                    'status': 200}
    except Exception as e:
        logging.error(e)
    return create_game(request, role)


def perform_action_on_game(request: HttpRequest, gameid: str, role: str) -> dict:
    result = {}
    try:
        body = json.loads(request.body.decode('utf-8'))
        if "action" not in body:
            result['status'] = 401
            result['error'] = 'Action is not presented in the request'
            result['body'] = body
            return result
        action = body["action"]
        actions = action_options()
        if action not in actions:
            result['status'] = 401
            result['error'] = f'Could not find {action} in the available actions'
            result['body'] = body
            return result
        game = Game.objects.get(unid=gameid)
        if game is None:
            result['status'] = 404
            return result
        actions[action](game, body, result, role)
        result['game'] = game.json(role)
    except Exception as e:
        logging.error(e)
        logging.error(request.body)
    return result


def action_options() -> dict:
    return {
        'next_question': set_next_question,
        'set_status': set_status
    }


def set_next_question(game: Game, body: dict, result: dict, role: str) -> bool:
    if 'questionid' not in body:
        result['status'] = 401
        result['error'] = 'Question Id was not provided for next question'
        result['body'] = body
        return False
    try:
        questionid = body['questionid']
        question = QuestionData.objects.get(unid=questionid)
        if question is not None:
            real_question_tuple = RealQuestion.objects.get_or_create(
                question_data=question, game=game, order=1)
            real_question = real_question_tuple[0]
            if real_question_tuple[1]:
                real_question.question_start = datetime.now(pytz.utc)
                real_question.save()
                RealAnswer.create_real_answers(real_question, question)
            game.current_question = real_question.unid
            game.status = GAME_STATUSES.QUESTION.value
            game.save()
            result['status'] = 200
            result['question'] = real_question.json(role)
            return True
    except Exception as e:
        logging.error(e)
    result['status'] = 401
    result['error'] = f'Could not find the question with id {questionid}'
    result['body'] = body
    return False


def set_status(game: Game, body: dict, result: dict, role: str) -> bool:
    if 'status' not in body:
        result['status'] = 401
        result['error'] = 'Status was not provided'
        result['body'] = body
        return False
    if not GAME_STATUSES.has_value(body['status']):
        result['status'] = 401
        result['error'] = f'Status {body["status"]} is not valid'
        result['body'] = body
        return False
    status = GAME_STATUSES(body['status'])
    if status == GAME_STATUSES.QUESTION:
        result['status'] = 401
        result['error'] = 'You cannot set the status of the game to question'
    if status == GAME_STATUSES.ENDING:
        AccessCode.close_access_codes(game)
    try:
        game.status = status.value
        game.current_question = None
        game.save()
        result['status'] = 200
        return True
    except Exception as e:
        logging.error(e)
    result['status'] = 401
    result['error'] = 'There was an internal error'
    result['body'] = body
    return False


def set_team_name(request: HttpRequest, role: str, game_id, team_number: int) -> dict:
    result = {}
    try:
        body = json.loads(request.body.decode('utf-8'))
        if 'name' not in body:
            result['status'] = 400
            result['error'] = 'Action is not presented in the request'
            result['body'] = body
            return result
        name = body['name']
        game: Game = Game.objects.get(unid=game_id)
        if game is None:
            result['status'] = 404
            result['error'] = 'Game not found'
            return result
        team: Team = game.team_set.filter(number=team_number).first()
        if team is not None:
            team.name = name
            team.save()
            return {
                'data': team.json(role),
                'status': 200
            }
        result['body'] = body
    except Exception as e:
        logging.error(e)
        logging.error(request.body)
    result['status'] = 400
    result['error'] = 'Could not set the team name'
    return result
