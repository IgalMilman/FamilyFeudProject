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
from funquizgame.data_getters.common_types import QuestionTypes, RequesterRole
from funquizgame.models.game import Game
from funquizgame.models.multi_language_item import MultiLanguageField


class QuestionData(MultiLanguageField):
    question_type = models.SmallIntegerField(
        "Question type*", choices=QuestionTypes.CHOICES)

    def answers_json(self, role: RequesterRole) -> list:
        result = []
        if role != RequesterRole.PARTICIPANT:
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

    def has_real_question(self, game: Game) -> bool:
        try:
            return self.realquestion_set.filter(game=game.unid).exists()
        except Exception as e:
            logging.error(e)
        return False

    def json_short_duplication_check(self, role: RequesterRole, game: Game) -> dict:
        result = self.json_short(role)
        result["has_real"] = self.has_real_question(game)
        return result

    @staticmethod
    def from_json(data: dict):
        question_type = data.get('qtype', None)
        answers = data.get('answers', None)
        text = data.get('text', None)
        if question_type is None or \
            answers is None or not isinstance(answers, list) or len(answers) == 0 or \
            text is None or not isinstance(text, list) or len(text) == 0:
            return None
        try:
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
        except Exception as e:
            logging.error(e.with_traceback())
        return None

