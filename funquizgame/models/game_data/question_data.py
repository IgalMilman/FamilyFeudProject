import logging
from django.db import models
from django.db.models.deletion import CASCADE
from funquizgame.common.common_types import GameQuestionTypes, RequesterRole
from ..game import Game
from ..multi_language_item import MultiLanguageField
from ..users.game_user import GameUser

class QuestionData(MultiLanguageField):
    question_type = models.SmallIntegerField(
        "Question type*", choices=GameQuestionTypes.get_valid_choices())
    created_by = models.ForeignKey(GameUser, null=True, blank=False, on_delete=CASCADE)

    def answers_json(self, role: RequesterRole) -> list:
        result = []
        if not role.is_participant():
            for answer in self.answerdata_set.all().order_by('-points_value'):
                result.append(answer.json(role))
        return list(filter(lambda x: x is not None, result))

    def json(self, role: RequesterRole) -> dict:
        result = self.json_short(role)
        result["answers"] = self.answers_json(role)
        return result

    def json_short(self, role: RequesterRole) -> dict:
        result = super().json()
        result["qtype"] = self.question_type
        return result

    def get_real_question(self, game: Game) -> object:
        try:
            return self.realquestion_set.filter(game=game.unid).first()
        except Exception as e:
            logging.error(e)
        return None

    def json_short_duplication_check(self, role: RequesterRole, game: Game) -> dict:
        result = self.json_short(role)
        real_question = self.get_real_question(game)
        result["has_real"] = real_question is not None
        result["is_complete"] = False if real_question is None else real_question.is_complete
        return result

    @staticmethod
    def from_json(data: dict, user:GameUser) -> 'QuestionData':
        id = data.get('id', None)
        question_type = data.get('qtype', None)
        answers = data.get('answers', None)
        text = data.get('text', None)
        if question_type is None and id is None or \
            answers is None or not isinstance(answers, list) or len(answers) == 0 or \
            text is None or not isinstance(text, list) or len(text) == 0:
            return None
        question:QuestionData = None
        if id is None:
            question = QuestionData.objects.create(question_type=question_type, created_by=user)
        else:
            [question, _] = QuestionData.objects.get_or_create(unid=id, question_type=question_type)
            question.created_by = user
            question.save()
        text_objects = question.upsert_text(text)
        if text_objects is None: 
            question.delete()
            return None
        from .answer_data import AnswerData
        for answer in answers:
            answer_object: AnswerData=AnswerData.from_json(answer, question)
            if answer_object is None:
                question.delete()
                return None
        return question

