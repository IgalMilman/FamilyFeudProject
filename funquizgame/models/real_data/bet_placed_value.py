from typing import Dict

from django.db import models
from django.db.models.deletion import CASCADE

from funquizgame.common.common_types import RequesterRole

from ..team import Team
from .real_data_abstract import RealDataAbstract
from .bet_opportunity import BetOpportunity
import logging


class BetPlacedValue(RealDataAbstract):
    bet = models.ForeignKey(BetOpportunity, on_delete=CASCADE, null=True)
    team = models.ForeignKey(Team, on_delete=CASCADE, null=True, blank=True)
    betsize = models.IntegerField("Bet size", blank=True, null=True)
    is_shown = models.BooleanField("Answer is shown?", default=False)
    assigned = models.IntegerField("Assigned?", default=0)
    bet_created = models.DateTimeField(
        "Creation time", auto_now_add=False, null=True, blank=True
    )

    def main_data(self) -> Dict:
        return {
            "id": self.unid,
            "is_shown": self.is_shown,
            "assigned": self.assigned if self.assigned is not None else 0,
            "bet": self.bet.unid,
            "team": self.team.number if self.team is not None else None,
            "created": self.bet_created.timestamp()
            if self.bet_created is not None
            else None,
            "created_time": self.bet_created,
        }

    def json(self, role: RequesterRole) -> Dict:
        try:
            result = self.main_data()
            if role.is_host() or self.is_shown:
                result["size"] = self.betsize
            return result
        except Exception as e:
            logging.error(e)
            return None

    @staticmethod
    def create_bet(bet: BetOpportunity, team: Team):
        return BetPlacedValue.objects.get_or_create(
            bet=bet, game=bet.game, team=team
        )
