import json
from typing import Dict, List, Tuple, Any

from django.contrib.auth import authenticate, login, logout
from django.http import HttpRequest
from funquizgame.common.common_types import RequesterRole

from funquizgame.common.common_functions import is_blank
from funquizgame.models import GameUserParticipation, Game, GameUser, Team


def login_user_access_code_post(request: HttpRequest) -> Tuple[GameUser, Game]:
    if request.method == "POST":
        access_code = request.POST.get("access_code", None)
        return process_login_access_code(request, access_code)
    return None, None


def login_user_access_code_get(request: HttpRequest) -> Tuple[GameUser, Game]:
    if request.method == "GET":
        access_code = request.GET.get("access_code", None)
        return process_login_access_code(request, access_code)
    return None, None


def login_user_access_code_put(request: HttpRequest) -> Dict[str, Any]:
    if request.method != "PUT":
        return {"status": 403, "error": "Access Code is required"}
    body = json.loads(request.body.decode("utf-8"))
    gameUser, game = process_login_access_code(request, body.get("access_code", None))
    return {"status": 200, "user": gameUser.json(), "game": game.json_short()}


def activate_user_action(request: HttpRequest) -> Tuple[GameUser, Game]:
    first_name = request.POST.get("first_name", None)
    last_name = request.POST.get("last_name", "")
    game_id = request.POST.get("game_id", None)
    if is_blank(first_name) or game_id is None or request.user is None:
        return None, None
    game: Game = Game.objects.get(unid=game_id)
    if game is None:
        logout(request)
        return None, None
    request.user.first_name = first_name
    request.user.last_name = last_name
    request.user.save()
    return request.user, game


def process_login_access_code(
    request: HttpRequest, access_code: str
) -> Tuple[GameUser, Game]:
    if is_blank(access_code):
        return None, None
    access_code_obj = GameUserParticipation.get_active_access_code(access_code)
    if access_code_obj is not None:
        login(request, access_code_obj.user)
        return access_code_obj.user, access_code_obj.game
    return None, None


def login_user_user_name(request: HttpRequest) -> GameUser:
    username = request.POST.get("username", None)
    password = request.POST.get("password", None)
    if is_blank(username) or is_blank(password):
        return None
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return user
    return None


def login_user_as_viewer(request: HttpRequest):
    user: GameUser = GameUser.get_viewer_user()
    login(request, user)


def get_available_access_codes(request: HttpRequest, game_id: str) -> List[Dict]:
    game: Game = Game.objects.get(unid=game_id)
    if game is None or not (
        game.created_by == request.user
        or game.created_by is None
        and request.user.role == RequesterRole.HOST
    ):
        return []
    game_participations = GameUserParticipation.get_active_access_codes_for_game(
        game=game
    )
    result = []
    default_users = GameUser.get_default_users()
    for game_participation in game_participations:
        if (
            game_participation.user.user_is_active()
            and game_participation.user not in default_users
        ):
            result.append(game_participation.json())
    return result


def generate_users_and_access_codes(request: HttpRequest, game_id: str, number:int) -> List[Dict]:
    game: Game = Game.objects.get(unid=game_id)
    if game is None or not (
        game.created_by == request.user
        or game.created_by is None
        and request.user.role == RequesterRole.HOST
    ) or not number:
        return []
    game_participations = GameUserParticipation.create_codes_and_users_for_game(
        game, number
    )
    return [obj.json() for obj in game_participations]


def get_all_users_and_access_codes_for_game(
    request: HttpRequest, game_id: str
) -> Dict[str, Dict]:
    game: Game = Game.objects.get(unid=game_id)
    if game is None or not (
        game.created_by == request.user
        or game.created_by is None
        and request.user.role == RequesterRole.HOST
    ):
        return []
    return GameUserParticipation.get_all_codes_and_users_for_game(game)


def get_active_users_for_game(
    request: HttpRequest, game_id: str
) -> Dict[int, List[Dict]]:
    game: Game = Game.objects.get(unid=game_id)
    if game is None:
        return {}
    active_users: List[GameUser] = GameUserParticipation.get_active_users_for_game(game)
    result: Dict[int, List[Dict]] = {}
    default_users = GameUser.get_default_users()
    for user in active_users:
        if user not in default_users:
            team: int = user.team if user.team else 0
            if team not in result:
                result[team] = []
            result[team].append(user.json())
    return result


def make_user_a_captain(
    game_id: str, user_id: int
) -> Dict[str, Any]:
    game: Game = Game.objects.get(unid=game_id)
    user: GameUser = GameUser.objects.get(id=user_id)
    if game is None or user is None or user.team is None:
        return {
            "status": 403,
        }
    team: Team = Team.objects.get(game=game, number=user.team)
    if team is None:
        return {
            "status": 403,
        }
    team.captain = user
    team.save()
    return {
        "status": 200,
    }


def add_user_to_a_team(
    game_id: str, team_number: int, user_id: int
) -> Dict[str, Any]:
    game: Game = Game.objects.get(unid=game_id)
    user: GameUser = GameUser.objects.get(id=user_id)
    if game is None or user is None or user.is_default():
        return {
            "status": 403,
        }
    user.team = team_number if team_number in {0, 1, 2} else 0
    user.save()
    return {
        "status": 200
    }


def deactivate_user(
   user_id: int
) -> Dict[str, Any]:
    user: GameUser = GameUser.objects.get(id=user_id)
    if user is None or not RequesterRole.get_role_for_user(user).is_viewer_participant() or user.is_default():
        return {
            "status": 403,
        }
    user.first_name = ''
    user.last_name = ''
    user.last_login = None
    user.save()
    return {
        "status": 200
    }
