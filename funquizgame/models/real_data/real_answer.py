from typing import Dict

from django.db import models
from django.db.models.deletion import CASCADE

from funquizgame.common.common_types import GameQuestionTypes, RequesterRole

from ..game_data.answer_data import AnswerData
from ..game_data.question_data import QuestionData
from ..team import Team
from .real_data_abstract import RealDataAbstract
from .real_question import RealQuestion


class RealAnswer(RealDataAbstract):
    is_shown = models.BooleanField("Answer is shown?", default=False)
    answer_data = models.ForeignKey(AnswerData, on_delete=CASCADE, null=True)
    question = models.ForeignKey(RealQuestion, on_delete=CASCADE, db_index=True)
    team = models.ForeignKey(Team, on_delete=CASCADE, null=True, blank=True)
    value = models.CharField("Entered value", null=True, blank=True, max_length=70)
    text_answer = models.CharField("Entered text value", null=True, blank=True, max_length=200)
    additional_points = models.SmallIntegerField("Additional points", default=0)
    answer_created = models.DateTimeField(
        "Creation time", auto_now_add=False, null=True, blank=True
    )

    def main_data(self) -> Dict:
        return {
            "id": self.unid,
            "is_shown": self.is_shown,
            "team": self.team.number if self.team is not None else None,
            "created": self.answer_created.timestamp()
            if self.answer_created is not None
            else None,
            "created_time": self.answer_created,
        }

    def json(self, role: RequesterRole) -> Dict:
        if role.is_host():
            result = self.main_data()
            if self.answer_data is not None:
                result["answerdata"] = self.answer_data.json(role)
            result["value"] = self.value
            result["textanswer"] = self.text_answer
            result["add_points"] = self.additional_points
            return result
        else:
            result = self.main_data()
            if self.is_shown:
                if self.answer_data is not None:
                    result["answerdata"] = self.answer_data.json(role)
                result["value"] = self.value
                result["textanswer"] = self.text_answer
                result["add_points"] = self.additional_points
            return result

    @staticmethod
    def create_real_answers(realquestion: RealQuestion, question: QuestionData):
        if question.question_type == GameQuestionTypes.FAMILY_FUID:
            for answer in question.answerdata_set.all().order_by("-points_value"):
                RealAnswer.objects.get_or_create(
                    question=realquestion, game=realquestion.game, answer_data=answer
                )

    @staticmethod
    def get_real_answer_object(team: Team, question: RealQuestion, answer: AnswerData):
        if answer is None:
            result = RealAnswer.objects.get_or_create(
                team=team, question=question, game=question.game
            )
            return result[0]
        else:
            result = RealAnswer.objects.get_or_create(
                question=question, answer_data=answer, game=question.game
            )
            if result[1]:
                pass
            return result[0]
