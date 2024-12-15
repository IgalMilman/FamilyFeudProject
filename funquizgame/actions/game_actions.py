import json
import logging
from typing import Dict

from django.http.request import HttpRequest

from funquizgame.common.common_functions import is_blank
from funquizgame.common.common_types import GAME_STATUSES
from funquizgame.models import Game, QuestionData, RealAnswer, RealQuestion, Survey, Team, GameUserParticipation, BetOpportunity


def create_game(request: HttpRequest, role: str) -> Dict:
    try:
        body = json.loads(request.body.decode("utf-8"))
        game_name = body.get("title", None)
        if is_blank(game_name):
            return {"status": 400, "error": "You must provide a title for the game"}
        game: Game = Game.objects.create(title=game_name, created_by=request.user)
        Team.objects.get_or_create(game=game, number=1)
        Team.objects.get_or_create(game=game, number=2)
        GameUserParticipation.get_or_create_codes_for_game_for_default_users(game)
        result = {"data": game.json_short(role), "status": 200}
        return result
    except Exception as e:
        logging.error(e)
    return {"status": 400, "error": "There was an internal error"}


def get_or_create_game(request: HttpRequest, role: str) -> Dict:
    try:
        games = Game.objects.exclude(status=GAME_STATUSES.ENDING).order_by(
            "-started_on"
        )
        if games is not None and len(games) > 0:
            return {"game": games.first().json(request.user, role), "status": 200}
    except Exception as e:
        logging.error(e)
    return create_game(request, role)


def perform_action_on_game(request: HttpRequest, gameid: str, role: str) -> Dict:
    result = {}
    try:
        body = json.loads(request.body.decode("utf-8"))
        if "action" not in body:
            result["status"] = 401
            result["error"] = "Action is not presented in the request"
            result["body"] = body
            return result
        action = body["action"]
        actions = action_options()
        if action not in actions:
            result["status"] = 401
            result["error"] = f"Could not find {action} in the available actions"
            result["body"] = body
            return result
        game = Game.objects.get(unid=gameid)
        if game is None:
            result["status"] = 404
            return result
        actions[action](game, body, result, role)
        result["game"] = game.json(request.user, role)
    except Exception as e:
        logging.error(e)
        logging.error(request.body)
    return result


def action_options() -> Dict:
    return {"next_question": set_next_question, "set_status": set_status, "set_survey": set_survey}


def set_next_question(game: Game, body: Dict, result: Dict, role: str) -> bool:
    if "questionid" not in body:
        result["status"] = 401
        result["error"] = "Question Id was not provided for next question"
        result["body"] = body
        return False
    try:
        questionid = body["questionid"]
        question = QuestionData.objects.get(unid=questionid)
        if question is not None:
            real_question_tuple = RealQuestion.objects.get_or_create(
                question_data=question, game=game, order=1
            )
            real_question = real_question_tuple[0]
            if real_question_tuple[1]:
                real_question.save()
                RealAnswer.create_real_answers(real_question, question)
            game.current_bet = get_betting_opportunity(game, real_question)
            game.current_question = real_question.unid
            game.current_survey = None
            game.status = GAME_STATUSES.QUESTION.value
            game.save()
            result["status"] = 200
            result["question"] = real_question.json(role)
            return True
    except Exception as e:
        logging.error(e)
    result["status"] = 401
    result["error"] = f"Could not find the question with id {questionid}"
    result["body"] = body
    return False

def get_betting_opportunity(game: Game, question: RealQuestion) -> BetOpportunity:
    bet_opportunity = question.betopportunity_set.first()
    if bet_opportunity is not None:
        return bet_opportunity.unid
    if game.current_bet is None: 
        return None
    bet_opportunity = BetOpportunity.objects.get(unid=game.current_bet)
    if bet_opportunity is not None and bet_opportunity.question is None:
        return bet_opportunity.unid
    return None

def set_status(game: Game, body: Dict, result: Dict, role: str) -> bool:
    if "status" not in body:
        result["status"] = 401
        result["error"] = "Status was not provided"
        result["body"] = body
        return False
    if not GAME_STATUSES.has_value(body["status"]):
        result["status"] = 401
        result["error"] = f'Status {body["status"]} is not valid'
        result["body"] = body
        return False
    status = GAME_STATUSES(body["status"])
    if status == GAME_STATUSES.QUESTION:
        result["status"] = 401
        result["error"] = "You cannot set the status of the game to question"
    if status == GAME_STATUSES.SURVEY:
        result["status"] = 401
        result["error"] = "You cannot set the status of the game to survey"
    if status == GAME_STATUSES.ENDING:
        GameUserParticipation.close_access_codes(game)
    try:
        game.status = status.value
        game.current_question = None
        game.save()
        result["status"] = 200
        return True
    except Exception as e:
        logging.error(e)
    result["status"] = 401
    result["error"] = "There was an internal error"
    result["body"] = body
    return False


def set_survey(game: Game, body: Dict, result: Dict, role: str) -> bool:
    if "survey_id" not in body:
        result["status"] = 401
        result["error"] = "Survey id was not provided"
        result["body"] = body
        return False
    try:
        survey_id = body["survey_id"]
        survey = Survey.objects.get(unid=survey_id)
        if survey is not None:
            game.current_question = None
            game.current_survey = survey.unid
            game.status = GAME_STATUSES.SURVEY.value
            game.save()
            result["status"] = 200
            return True
    except Exception as e:
        logging.error(e)
    result["status"] = 401
    result["error"] = f"Could not find the survey with id {survey_id}"
    result["body"] = body
    return False


def set_team_name(request: HttpRequest, role: str, game_id, team_number: int) -> Dict:
    result = {}
    try:
        body = json.loads(request.body.decode("utf-8"))
        if "name" not in body:
            result["status"] = 400
            result["error"] = "Action is not presented in the request"
            result["body"] = body
            return result
        name = body["name"]
        game: Game = Game.objects.get(unid=game_id)
        if game is None:
            result["status"] = 404
            result["error"] = "Game not found"
            return result
        team: Team = game.team_set.filter(number=team_number).first()
        if team is not None:
            team.name = name
            team.save()
            return {"data": team.json(role), "status": 200}
        result["body"] = body
    except Exception as e:
        logging.error(e)
        logging.error(request.body)
    result["status"] = 400
    result["error"] = "Could not set the team name"
    return result
