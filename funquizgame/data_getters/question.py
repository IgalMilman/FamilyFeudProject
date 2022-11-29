import logging
from typing import List

from django.db.models.query_utils import Q
from django.http.request import HttpRequest

from funquizgame.common.common_types import QuestionTypes, RequesterRole
from funquizgame.models import Game, QuestionData, RealQuestion
from funquizgame.models.users.game_user import GameUser


def get_real_question(role: RequesterRole, game_id, question_id: str) -> dict:
    try:
        question = RealQuestion.objects.get(unid=question_id)
        if question is not None:
            return question.json(role)
    except Exception as e:
        logging.error(e)
    return {}


def get_question_data(role: RequesterRole, question_id: str) -> dict:
    try:
        question = QuestionData.objects.get(unid=question_id)
        if question is not None:
            return question.json(role)
    except Exception as e:
        logging.error(e)
    return {}


def get_all_questions_for_game(
    role: RequesterRole, user: GameUser, game_id: str
) -> list:
    if not role.is_host():
        return []
    result = []
    try:
        game: Game = Game.objects.get(unid=game_id)
        questions: List[QuestionData] = QuestionData.objects.filter(
            Q(created_by=user) | Q(created_by=None)
        )
        if questions is not None:
            for question in questions:
                result.append(question.json_short_duplication_check(role, game))
    except Exception as e:
        logging.error(e)
    return result


def get_all_questions_of_type_for_game(
    role: RequesterRole, user: GameUser, game_id: str, questiontype: int
) -> list:
    if not role.is_host():
        return []
    result = []
    try:
        game: Game = Game.objects.get(unid=game_id)
        questions: List[QuestionData] = QuestionData.objects.filter(
            question_type=questiontype
        ).filter(Q(created_by=user) | Q(created_by=None))
        if questions is not None:
            for question in questions:
                result.append(question.json_short_duplication_check(role, game))
    except Exception as e:
        logging.error(e)
    return result


def get_all_questions(
    role: RequesterRole,
    request: HttpRequest,
) -> list:
    if not role.is_host():
        return []
    user: GameUser = request.user
    question_types: list[int] = request.GET.getlist(
        "qtype", QuestionTypes.get_valid_values()
    )
    result = []
    try:
        for question_type in question_types:
            if question_type not in QuestionTypes.get_valid_values():
                continue
            questions: List[QuestionData] = QuestionData.objects.filter(
                question_type=question_type
            ).filter(Q(created_by=user) | Q(created_by=None))
            if questions is not None:
                for question in questions:
                    result.append(question.json_short(role))
    except Exception as e:
        logging.error(e)
    return result
