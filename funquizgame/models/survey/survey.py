from typing import Dict, List, Tuple

from django.db import models
from django.db.models.deletion import SET_NULL

from ..multi_language_item import MultiLanguageField

from ..users.game_user import GameUser
from ..game import Game


class Survey(MultiLanguageField):
    created_by = models.ForeignKey(GameUser, null=True, on_delete=SET_NULL)
    created_on = models.DateTimeField(
        "Created time", auto_now_add=True, null=False, blank=False
    )
    
    def json_short(self)->Dict:
        return super().json('title')

    def json(self)->Dict:
        result = self.json_short()
        result['questions'] = [question.json() for question in self.questions.all()]
        return result
    
    def json_with_answers(self, game:Game)->Dict:
        result = self.json()
        result['answers'] = [answer.json() for answer in self.survey_answers.filter(game=game)]
        return result

    @staticmethod
    def from_json(data:Dict, user:GameUser) -> 'Survey':
        if user is None:
            return None
        [id, text, questions] = Survey._extract_data(data)
        survey:Survey = None
        if id is None:
            survey = Survey.objects.create(created_by=user)
        else:
            [survey, _] = Survey.objects.get_or_create(unid=id)
            survey.created_by = user
            survey.save()
        text_objects = survey.upsert_text(text)
        if text_objects is None: 
            survey.delete()
            return None
        from .survey_question import SurveyQuestion
        for question in questions:
            question_object: SurveyQuestion=SurveyQuestion.from_json(question, survey)
            if question_object is None:
                survey.delete()
                return None
        return survey

    @staticmethod
    def validate_data(data:Dict) -> Tuple[bool, List[Dict]]:
        [_, text, questions] = Survey._extract_data(data)
        errors:List[Dict] = []
        if questions is None or not isinstance(questions, list) or len(questions) == 0:
            errors.append({'questions': 'Questions have to be presented.'})
        else:
            from .survey_question import SurveyQuestion
            for i in range(0, len(questions)):
                validation_result = SurveyQuestion.validate_data(questions[i])
                if not validation_result[0]:
                    errors.append({f'questions_{i}': validation_result[1]})
        if text is None or not isinstance(text, list) or len(text) == 0:
            errors.append({'title': 'Title have to be presented'})
        return [len(errors) == 0, errors]
            

    @staticmethod
    def _extract_data(data:Dict) -> Tuple[str, List[str], List[Dict]]:
        if not isinstance(data, dict):
            return [None, None, None]
        return [data.get('id', None), data.get('title', None), data.get('questions', None)]
