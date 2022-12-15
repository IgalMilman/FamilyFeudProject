from typing import Dict, List, Tuple
import logging

from django.db import models
from django.db.models.deletion import CASCADE

from funquizgame.common.common_types import SurveyQuestionTypes

from ..multi_language_item import MultiLanguageField
from .survey import Survey


class SurveyQuestion(MultiLanguageField):
    survey_field = models.ForeignKey(Survey, null=True, blank=False, on_delete=CASCADE, related_name='questions')
    type = models.SmallIntegerField(
        'Question type*', choices=SurveyQuestionTypes.get_valid_choices()
    )
    parameters = models.JSONField('parameters', null=True, blank=True, default=dict)
    priority = models.IntegerField('Priority', null=False, blank=False, default=0)

    def json(self):
        result = super().json()
        result['qtype'] = self.type
        result['parameters'] = self.parameters
        result['priority'] = self.priority
        return result

    @staticmethod
    def from_json(data:Dict, survey:Survey) -> 'SurveyQuestion':
        [id, qtype, text, priority, parameters] = SurveyQuestion._extract_data(data)
        if survey is None:
            return None
        question:SurveyQuestion = None
        if id is None:
            question = SurveyQuestion.objects.create(type=qtype, parameters=parameters, priority=priority, survey_field=survey)
        else:
            [question, _] = SurveyQuestion.objects.get_or_create(unid=id)
            question.parameters = parameters
            question.priority = priority
            question.save()
        text_objects = question.upsert_text(text)
        if text_objects is None: 
            question.delete()
            return None
        return question

    @staticmethod
    def validate_data(data:Dict) -> Tuple[bool, List[Dict]]:
        [id, qtype, text, _, _] = SurveyQuestion._extract_data(data)
        errors: List[Dict] = []
        if text is None or not isinstance(text, list) or len(text) == 0:
            errors.append({'text': 'Question text must be presented'})
        if (qtype is None or qtype not in SurveyQuestionTypes.get_valid_values()) and id is None:
            errors.append({'general': 'Either question type or ID must be presented'})
        return [len(errors) == 0, errors]
            

    @staticmethod
    def _extract_data(data:Dict) -> Tuple[str, int, List[str], int, Dict]:
        if not isinstance(data, dict):
            return [None, None, None, 0, {}]
        return [data.get('id', None),
        data.get('qtype', None),
        data.get('text', None),
        data.get('priority', 0),
        data.get('parameters', {})]
