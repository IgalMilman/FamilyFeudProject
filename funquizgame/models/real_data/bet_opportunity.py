from typing import Dict

from django.db import models
from django.db.models.deletion import CASCADE

from funquizgame.common.common_types import RequesterRole

from .. import Game
from .real_data_abstract import RealDataAbstract
from .real_question import RealQuestion
import logging


class BetOpportunity(RealDataAbstract):
    is_shown = models.BooleanField("Opportunity is shown?", default=False)
    question = models.ForeignKey(RealQuestion, on_delete=CASCADE, null=True, db_index=False)

    def main_data(self) -> Dict:
        return {
            "id": self.unid,
            "is_shown": self.is_shown,
            "question": self.question.unid if self.question else None,
        }

    def json(self, role: RequesterRole) -> Dict:
        try:
            result = self.main_data()
            bets = []
            for bet in self.betplacedvalue_set.all():
                bets.append(bet.json(role))
            result["bets"] = bets
            return result
        except Exception as e:
            logging.error(e)
            return {"message": "Error getting bet"}      

    @staticmethod
    def create_bet_opportunity(game: Game):
        return BetOpportunity.objects.get_or_create(game=game, question=None)
