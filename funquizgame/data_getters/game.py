import logging, traceback
from typing import List
from funquizgame.common.common_types import GAME_STATUSES, RequesterRole
from funquizgame.models.game import Game

def get_game(role: RequesterRole, game_id: str)->dict:
    try:
        game:Game = Game.objects.get(unid=game_id)
        if game is not None:
            return {
                'data': game.json(role),
                'status': 200
            }
    except Exception as e:
        logging.error(e)
    return {'data': None,
    'status': 404,
    'error': 'Could not find the game'}

def get_all_active_games(role: RequesterRole)->List:
    try:
        games = Game.objects.exclude(status=GAME_STATUSES.ENDING)
        if games is not None:
            result = [game.json_short(role) for game in games]
            return result
    except Exception as e:
        logging.error(e)
    return None