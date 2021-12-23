import json
import logging
from datetime import datetime, timedelta, timezone
from urllib.parse import quote, unquote

import pytz
from django.conf import settings
from django.contrib.auth.models import User
from django.core.files.storage import DefaultStorage
from django.db import models
from django.urls import reverse
from funquizgame.common.common_exceptions import ValidationException
from funquizgame.common.common_types import QuestionTypes, RequesterRole
from funquizgame.models.game import Game
from funquizgame.models.multi_language_item import MultiLanguageField

class QuestionData(MultiLanguageField):
    question_type = models.SmallIntegerField(
        "Question type*", choices=QuestionTypes.get_valid_choices())

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
    def from_json(data: dict) -> 'QuestionData':
        question_type = data.get('qtype', None)
        answers = data.get('answers', None)
        text = data.get('text', None)
        if question_type is None or \
            answers is None or not isinstance(answers, list) or len(answers) == 0 or \
            text is None or not isinstance(text, list) or len(text) == 0:
            return None
        question:QuestionData = QuestionData.objects.create(question_type=question_type)
        text_objects = question.create_text(text)
        if text_objects is None: 
            question.delete()
            return None
        from funquizgame.models.answer_data import AnswerData
        for answer in answers:
            answer_object: AnswerData=AnswerData.from_json(answer, question)
            if answer_object is None:
                question.delete()
                return None
        return question

