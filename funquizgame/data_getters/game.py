import logging
from typing import Dict, List

from funquizgame.common.common_types import GAME_STATUSES, RequesterRole
from funquizgame.models.game import Game
from funquizgame.models.users.game_user import GameUser


def get_game(role: RequesterRole, user: GameUser, game_id: str) -> Dict:
    try:
        game: Game = Game.objects.filter(unid=game_id).first()
        if game is not None:
            if role.is_host() and game.created_by != user:
                role = RequesterRole.VIEWER
            return {"data": game.json(user, role), "status": 200}
    except Exception as e:
        logging.error(e)
    return {"data": None, "status": 404, "error": "Could not find the game"}


def check_game_host(user: GameUser, game_id: str) -> bool:
    try:
        game: Game = Game.objects.filter(unid=game_id).first()
        return game.created_by == user
    except Exception as e:
        logging.error(e)
    return False


def get_all_active_games(user: GameUser) -> List:
    try:
        games = Game.objects.filter(created_by=user).exclude(status=GAME_STATUSES.ENDING.value)
        if games is not None:
            result = [game.json_short(RequesterRole.HOST) for game in games]
            return result
    except Exception as e:
        logging.error(e)
    return None
