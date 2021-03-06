from django.db.models.deletion import CASCADE

from django.db import models
from funquizgame.common.common_types import RequesterRole
from funquizgame.models.question_data import QuestionData
from funquizgame.models.real_data_abstract import RealDataAbstract


class RealQuestion(RealDataAbstract):
    is_shown = models.BooleanField("Question is shown?", default=False)
    is_complete = models.BooleanField("Question is complete?", default=False)
    question_data = models.ForeignKey(QuestionData, on_delete=CASCADE)
    order = models.SmallIntegerField("Order of the question in the game")
    question_start = models.DateTimeField(
        "Starting time", auto_now_add=False, null=True, blank=True
    )

    def get_all_real_answers(self, role: RequesterRole) -> list:
        result = []
        for sec in self.realanswer_set.all():
            result.append(sec)
        return result

    def get_all_real_answers_json(self, role: RequesterRole) -> list:
        real_answers = []
        for sec in self.realanswer_set.all():
            real_answers.append(sec.json(role))
        result = list(filter(lambda x: x is not None, real_answers))
        result.sort(
            key=lambda x: x.get("additional_points", 0)
            + x.get("answerdata", {}).get("points_value", 0),
            reverse=True,
        )
        return result

    def get_question_data(self, role: RequesterRole) -> dict:
        if role.is_host():
            return self.question_data.json(role)
        if self.is_shown:
            return self.question_data.json(
                RequesterRole.VIEWER if self.is_complete else RequesterRole.PARTICIPANT
            )
        return None

    def json(self, role: RequesterRole) -> dict:
        result = {
            "id": self.unid,
            "is_shown": self.is_shown,
            "is_complete": self.is_complete,
            "question_data": self.get_question_data(role),
            "order": self.order,
            "start": self.question_start.timestamp()
            if self.question_start is not None
            else None,
            "start_time": self.question_start,
            "real_answers": self.get_all_real_answers_json(role),
        }
        return result
