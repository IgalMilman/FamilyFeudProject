from django.db.models.deletion import CASCADE

from django.db import models
from funquizgame.data_getters.common_types import QuestionTypes, RequesterRole
from funquizgame.models.question_data import QuestionData
from funquizgame.models.team import Team
from funquizgame.models.answer_data import AnswerData
from funquizgame.models.real_data_abstract import RealDataAbstract
from funquizgame.models.real_question import RealQuestion


class RealAnswer(RealDataAbstract):
    is_shown = models.BooleanField("Answer is shown?", default=False)
    answer_data = models.ForeignKey(AnswerData, on_delete=CASCADE, null=True)
    question = models.ForeignKey(
        RealQuestion, on_delete=CASCADE, db_index=True)
    team = models.ForeignKey(Team, on_delete=CASCADE, null=True, blank=True)
    value = models.CharField("Entered value", null=True,
                             blank=True, max_length=70)
    additional_points = models.SmallIntegerField(
        "Additional points", default=0)

    def main_data(self)->dict:
        return {
            'id': self.unid,
            'is_shown': self.is_shown,
            'team': self.team.number if self.team is not None else None
        }

    def json(self, role: RequesterRole) -> dict:
        if role == RequesterRole.VIEWER:
            result = self.main_data()
            if self.is_shown:
                    if self.answer_data is not None:
                        result['answerdata'] = self.answer_data.json(
                            role)
                    result['value'] = self.value
                    result['add_points'] = self.additional_points
            return result
        elif role == RequesterRole.HOST:
            result = self.main_data()
            if self.answer_data is not None:
                result['answerdata'] = self.answer_data.json(role)
            result['value'] = self.value
            result['add_points'] = self.additional_points
            return result
        return None

    
    @staticmethod
    def create_real_answers(realquestion: RealQuestion, question: QuestionData):
        if question.question_type == QuestionTypes.FAMILY_FUID:
            for answer in question.answerdata_set.all().order_by('-points_value'):
                RealAnswer.objects.get_or_create(question=realquestion, game=realquestion.game, answer_data=answer)
        else:
            for team in realquestion.game.team_set.all().order_by('number'):
                #RealAnswer.objects.get_or_create(question=realquestion, game=realquestion.game, team=team)
                pass

    @staticmethod
    def get_real_answer_object(team:Team, question:RealQuestion, answer:AnswerData):
        if answer is None:
            result = RealAnswer.objects.get_or_create(team=team, question=question, game=question.game)
            return result[0]
        else:
            result = RealAnswer.objects.get_or_create(question=question, answer_data=answer, game=question.game)
            if result[1]:
                pass
            return result[0]