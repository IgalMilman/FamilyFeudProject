import logging
from funquizgame.data_getters.common_types import RequesterRole
from funquizgame.models.game import Game

def get_game(role: RequesterRole, game_id: str)->dict:
    try:
        game = Game.objects.get(unid=game_id)
        if game is not None:
            return game.json(role)
    except Exception as e:
        logging.error(e)
    return {}