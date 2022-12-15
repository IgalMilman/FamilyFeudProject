import logging
from typing import List, Tuple
import uuid

from django.db import models
from django.db.models.deletion import CASCADE

from .survey_answer import SurveyAnswer
from .survey_question import SurveyQuestion


class SurveyQuestionAnswer(models.Model):
    unid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True
    )
    survey_answer = models.ForeignKey(
        SurveyAnswer, null=False, blank=False, on_delete=CASCADE, related_name="answers"
    )
    question = models.ForeignKey(
        SurveyQuestion,
        null=False,
        blank=False,
        on_delete=CASCADE,
        related_name="answers",
    )
    answer = models.JSONField(null=False, blank=False, default=dict)

    def json(self) -> dict:
        return {
            'id': self.unid,
            'answer': self.answer,
            'question_id': str(self.question.unid)
        }

    @staticmethod
    def from_json(data:dict, survey_answer:SurveyAnswer, survey_question:SurveyQuestion) -> 'SurveyQuestionAnswer':
        id = data.get('id', None)
        answer = data.get('answer', None)
        if survey_answer is None or survey_question is None:
            return None
        result:SurveyQuestionAnswer = None
        if id is None:
            [result, created] = SurveyQuestionAnswer.objects.get_or_create(question=survey_question, survey_answer=survey_answer)
        else:
            [result, _] = SurveyQuestionAnswer.objects.get_or_create(unid=id, question=survey_question, survey_answer=survey_answer)
        result.answer = answer
        result.save()
        return result


    @staticmethod
    def validate_data(data:dict) -> Tuple[bool, List[dict]]:
        [_, answer] = SurveyQuestionAnswer._extract_data(data)
        errors:List[dict] = []
        if answer is None:
            errors.append({'answer': 'Answer have to be presented.'})
        return [len(errors) == 0, errors]
            

    @staticmethod
    def _extract_data(data:dict) -> Tuple[str, dict]:
        return [data.get('id', None), data.get('answer', None)]
