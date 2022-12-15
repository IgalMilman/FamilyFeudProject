import json
import logging
from typing import List, Tuple
import uuid

from django.db import models
from django.db.models.deletion import SET_NULL, CASCADE

from .survey import Survey

from ..users.game_user import GameUser
from ..game import Game


class SurveyAnswer(models.Model):
    unid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True
    )
    survey = models.ForeignKey(Survey, null=False, blank=False, on_delete=CASCADE, related_name='survey_answers')
    created_by = models.ForeignKey(GameUser, null=True, on_delete=SET_NULL)
    created_on = models.DateTimeField(
        "Created time", auto_now_add=True, null=False, blank=False
    )
    game = models.ForeignKey(
        Game, null=True, related_name="survey_answers", on_delete=SET_NULL
    )

    def get_question_answers(self) -> dict:
        result = {}
        for answer in self.answers.all():
            json = answer.json()
            result[json['question_id']] = json
        return result

    def json(self) -> dict:
        return {
            'id': self.unid,
            'created_by': self.created_by.id,
            'game': self.game.unid if self.game else None,
            'answers': self.get_question_answers()
        }

    @staticmethod
    def from_json(data:dict, user:GameUser, survey:Survey, game:Game) -> 'SurveyAnswer':
        [id, answers] = SurveyAnswer._extract_data(data)
        if user is None and id is None or game is None or survey is None:
            return None
        survey_answer:SurveyAnswer = None
        if id is None:
            [survey_answer, _] = SurveyAnswer.objects.get_or_create(created_by=user, survey=survey, game=game)
        else:
            [survey_answer, _] = SurveyAnswer.objects.get_or_create(unid=id)
            survey_answer.save()
        from .survey_question_answer import SurveyQuestionAnswer
        for question in survey.questions.all():
            answer_data = answers.get(str(question.unid), None)
            if answer_data:
                answer: SurveyQuestionAnswer=SurveyQuestionAnswer.from_json(answer_data, survey_answer, question)
                if answer is None:
                    survey_answer.delete()
                    return None
        return survey_answer

    @staticmethod
    def validate_data(data:dict) -> Tuple[bool, List[dict]]:
        [_, answers] = SurveyAnswer._extract_data(data)
        errors:List[dict] = []
        if answers is None or not isinstance(answers, dict):
            errors.append({'answers': 'Answers have to be presented.'})
        else:
            from .survey_question_answer import SurveyQuestionAnswer
            for i in answers:
                validation_result = SurveyQuestionAnswer.validate_data(answers[i])
                if not validation_result[0]:
                    errors.append({f'answers_{i}': validation_result[1]})
        return [len(errors) == 0, errors]
            

    @staticmethod
    def _extract_data(data:dict) -> Tuple[str, dict[str, dict]]:
        return [data.get('id', None), data.get('answers', None)]
