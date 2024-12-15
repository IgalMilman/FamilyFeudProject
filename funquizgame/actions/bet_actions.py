import json
import logging
from datetime import datetime
from typing import Dict

import pytz
from django.http.request import HttpRequest

from funquizgame.common.common_exceptions import ValidationException
from funquizgame.common.common_types import RequesterRole, GAME_STATUSES
from funquizgame.models import (Game, GameUser, QuestionData, RealAnswer,
                                RealQuestion, Team, BetPlacedValue, BetOpportunity)


def place_bet(
    request: HttpRequest, role: RequesterRole, game_id, bet_opportunity_id: str
) -> Dict:
    result = {}
    try:
        body = json.loads(request.body.decode("utf-8"))
        value = body.get("bet", None)
        teamnumber = body.get("teamnumber", None)
        if value is None:
            result["status"] = 401
            result["error"] = "Need to provide a bet value"
            result["body"] = body
            return result
        if teamnumber is None:
            result["status"] = 401
            result["error"] = "Need to provide a teamid"
            result["body"] = body
            return result
        bet_opportunity = BetOpportunity.objects.get(unid=bet_opportunity_id)
        team = Team.objects.get(game_id=game_id, number=teamnumber)
        bet: BetPlacedValue = BetPlacedValue.create_bet(bet_opportunity, team)[0]
        bet.betsize = value
        bet.save()
        result["status"] = 200
        result["bet"] = bet.json(role)
    except Exception as e:
        logging.error(e)
    return result


def create_and_reveal_bet_opportunity(
    request: HttpRequest, role: RequesterRole, game_id
) -> Dict:
    result = {}
    if not role.is_host():
        result["status"] = 401
        result["error"] = "Only hosts can create bet opportunities"
        return result
    try:
        game: Game = Game.objects.get(unid=game_id)
        bet_opportunity = BetOpportunity.create_bet_opportunity(game)[0]
        bet_opportunity.is_shown = True

        bet_opportunity.save()
        game.current_bet = bet_opportunity.unid
        game.status = GAME_STATUSES.BETTING.value
        game.save()
        result["status"] = 200
        result["bet_opportunity"] = bet_opportunity.json(role)
        return result
    except Exception as e:
        logging.error(e)
    result["status"] = 401
    result["error"] = f"Could not create bet for game question with id {game_id}"
    return result


def reveal_bet(
    request: HttpRequest, role: RequesterRole, game_id, bet_id: str
) -> Dict:
    if not role.is_host():
        result = {}
        result["status"] = 401
        result["error"] = "Only hosts can reveal bets"
        return result
    result = {}
    try:
        bet: BetPlacedValue = BetPlacedValue.objects.get(unid=bet_id)
        bet.is_shown = True
        bet.save()
        result["status"] = 200
        result["bet"] = bet.json(role)
        return result
    except Exception as e:
        logging.error(e)
    result["status"] = 401
    result["error"] = f"Could not find bet with id {bet_id}"
    return result


def assign_bet_opportunity_to_question(
    request: HttpRequest, role: RequesterRole, game_id, bet_op_id: str, question_id: str
) -> Dict:
    if not role.is_host():
        result = {}
        result["status"] = 401
        result["error"] = "Only hosts can assign bet opportunities to questions"
        return result
    result = {}
    try:
        bet: BetOpportunity = BetOpportunity.objects.get(unid=bet_op_id)
        question: RealQuestion = RealQuestion.objects.get(unid=question_id)
        bet.question = question
        bet.save()
        result["status"] = 200
        result["bet"] = bet.json(role)
        return result
    except Exception as e:
        logging.error(e)
    result["status"] = 401
    result["error"] = f"Could not find bet with id {bet_op_id}"
    return result

def assign_bet_result(
    request: HttpRequest, role: RequesterRole, game_id, bet_id: str, correctness: int
) -> Dict:
    if not role.is_host():
        result = {}
        result["status"] = 401
        result["error"] = "Only hosts can assign bet opportunities to questions"
        return result
    result = {}
    if correctness not in [-1, 0, 1]:
        result["status"] = 401
        result["error"] = "Incorrect correctness value"
        return result
    try:
        bet: BetPlacedValue = BetPlacedValue.objects.get(unid=bet_id)
        team: Team = bet.team
        coef: int = correctness - bet.assigned
        team.points += coef * bet.betsize
        team.save()
        bet.assigned = correctness
        bet.save()
        result["status"] = 200
        result["bet"] = bet.json(role)
        result["team"] = team.json(role)
        return result
    except Exception as e:
        logging.error(e)
    result["status"] = 401
    result["error"] = f"Could not find bet with id {bet_id}"
    return result

