import logging

from funquizgame.common.common_types import RequesterRole
from funquizgame.models.game import Game
from funquizgame.models.question_data import QuestionData
from funquizgame.models.real_question import RealQuestion

from typing import List


def get_real_question(role: RequesterRole, game_id, question_id: str) -> dict:
    try:
        question = RealQuestion.objects.get(unid=question_id)
        if question is not None:
            return question.json(role)
    except Exception as e:
        logging.error(e)
    return {}


def get_question_data(role: RequesterRole, game_id, question_id: str) -> dict:
    try:
        question = QuestionData.objects.get(unid=question_id)
        if question is not None:
            return question.json(role)
    except Exception as e:
        logging.error(e)
    return {}


def get_all_questions(role: RequesterRole, game_id: str) -> list:
    if not role.is_host():
        return []
    result = []
    try:
        game: Game = Game.objects.get(unid=game_id)
        questions: List[QuestionData] = QuestionData.objects.all()
        if questions is not None:
            for question in questions:
                result.append(
                    question.json_short_duplication_check(role, game))
    except Exception as e:
        logging.error(e)
    return result


def get_all_questions_of_type(role: RequesterRole, game_id: str, questiontype: int) -> list:
    if not role.is_host():
        return []
    result = []
    try:
        game: Game = Game.objects.get(unid=game_id)
        questions: List[QuestionData] = QuestionData.objects.filter(
            question_type=questiontype)
        if questions is not None:
            for question in questions:
                result.append(
                    question.json_short_duplication_check(role, game))
    except Exception as e:
        logging.error(e)
    return result
