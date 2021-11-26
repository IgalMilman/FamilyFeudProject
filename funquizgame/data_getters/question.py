import logging

from funquizgame.data_getters.common_types import RequesterRole
from funquizgame.models.game import Game
from funquizgame.models.question_data import QuestionData
from funquizgame.models.real_question import RealQuestion

def get_real_question(role: RequesterRole, question_id: str)->dict:
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

def get_all_questions(role: RequesterRole, gameid:str) -> list:
    if role != RequesterRole.HOST:
        return []
    result=[]
    try:
        game = Game.objects.get(unid=gameid)
        questions = QuestionData.objects.all()
        if questions is not None:
            for question in questions:
                result.append(question.json_short_duplication_check(role, game))
    except Exception as e:
        logging.error(e)
    return result
    
def get_all_questions_of_type(role: RequesterRole, gameid:str, questiontype:int) -> list:
    if role != RequesterRole.HOST:
        return []
    result=[]
    try:
        game = Game.objects.get(unid=gameid)
        questions = QuestionData.objects.filter(question_type=questiontype)
        if questions is not None:
            for question in questions:
                result.append(question.json_short_duplication_check(role, game))
    except Exception as e:
        logging.error(e)
    return result
    