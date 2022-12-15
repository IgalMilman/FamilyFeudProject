from typing import Dict, List

from django.db import models
from django.db.models.deletion import CASCADE

from funquizgame.common.common_types import RequesterRole

from ..game_data.question_data import QuestionData
from .real_data_abstract import RealDataAbstract


class RealQuestion(RealDataAbstract):
    is_shown = models.BooleanField("Question is shown?", default=False)
    is_complete = models.BooleanField("Question is complete?", default=False)
    question_data = models.ForeignKey(QuestionData, on_delete=CASCADE)
    order = models.SmallIntegerField("Order of the question in the game")
    question_start = models.DateTimeField(
        "Starting time", auto_now_add=False, null=True, blank=True
    )

    def get_all_real_answers(self, role: RequesterRole) -> List:
        result = []
        for sec in self.realanswer_set.all():
            result.append(sec)
        return result

    def get_all_real_answers_json(self, role: RequesterRole) -> List:
        result = []
        question_price = {}
        for sec in self.realanswer_set.all():
            if not sec:
                continue
            result.append(sec.json(role))
            if sec.answer_data and sec.answer_data.points_value:
                question_price[sec.unid] = sec.answer_data.points_value
            if sec.additional_points:
                question_price[sec.unid] = (
                    question_price.get(sec.unid, 0) + sec.additional_points
                )
        result.sort(
            key=lambda x: question_price.get(x.get("id", ""), 0),
            reverse=True,
        )
        return result

    def get_question_data(self, role: RequesterRole) -> Dict:
        if role.is_host():
            return self.question_data.json(role)
        if self.is_shown:
            return self.question_data.json(
                RequesterRole.VIEWER if self.is_complete else RequesterRole.PARTICIPANT
            )
        return None

    def json(self, role: RequesterRole) -> Dict:
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
