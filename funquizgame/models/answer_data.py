import logging
from django.db.models.deletion import CASCADE

from django.db import models
from funquizgame.common.common_exceptions import ValidationExceptionBuilder
from funquizgame.common.common_types import RequesterRole
from funquizgame.models.multi_language_item import MultiLanguageField
from funquizgame.models.question_data import QuestionData


class AnswerData(MultiLanguageField):
    points_value = models.SmallIntegerField("Points value", default=0)
    people_answered = models.SmallIntegerField(
        "Number of people answered", null=True, blank=True)
    correct_value = models.IntegerField(
        "Correct value", default=None, blank=True, null=True)
    question = models.ForeignKey(
        QuestionData, on_delete=CASCADE, null=False, db_index=True)

    def get_answer(self, role: RequesterRole) -> dict:
        if role.is_participant():
            return None
        else:
            return self

    def json(self, role: RequesterRole) -> dict:
        if role.is_participant():
            return super().json()
        else:
            result = super().json()
            result['points_value'] = self.points_value
            result['people_answered'] = self.people_answered
            result['correct_value'] = self.correct_value
            return result

    @staticmethod
    def from_json(json: dict, question:QuestionData):
        textlist = json.get('text', None)
        value = json.get('correct_value', None)
        people = json.get('people_answered', None)
        points = json.get('points_value', None)
        if (textlist is None or not isinstance(textlist, list)) and value is None or points is None or people is None:
            builder = ValidationExceptionBuilder()
            if (textlist is None or not isinstance(textlist, list)) and value is None:
                builder.add_empty_value_error('text').add_empty_value_error('correct_value')
            if points is None:
                builder.add_empty_value_error('points_value')
            if people is None:
                builder.add_empty_value_error('people_answered')
            raise builder.build()
        try:
            answer:AnswerData = AnswerData.objects.create(question=question, correct_value=value, people_answered=people, points_value=points)
            if textlist is not None and len(textlist) > 0:
                res = answer.create_text(textlist)
                if res is None:
                    answer.delete()
                    return None
            return answer
        except Exception as e:
            logging.error(e)
        return None