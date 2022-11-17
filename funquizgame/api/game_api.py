from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.http.request import HttpRequest
from django.views.decorators.http import require_http_methods
from funquizgame.actions.game_actions import (create_game,
                                              perform_action_on_game, set_team_name)
from funquizgame.common.common_types import RequesterRole
from funquizgame.data_getters.game import get_all_active_games, get_game


@login_required(login_url="login")
@require_http_methods(["GET", "PUT"])
def game_api(request: HttpRequest, gameid):
    role = RequesterRole.get_role_from_request(request)
    if request.method == "GET":
        result = get_game(role, request.user, gameid)
        return JsonResponse(result, status=result.get("status", 403), safe=False)
    if request.method == "PUT":
        if not role.is_host():
            return JsonResponse({}, status=403, safe=False)
        result = perform_action_on_game(request, gameid, role)
        return JsonResponse(result, status=result.get("status", 403), safe=False)
    return JsonResponse({"error": "notimplemented"}, status=401, safe=False)


@login_required(login_url="login")
@require_http_methods(["PUT"])
def create_game_api(request: HttpRequest):
    role = RequesterRole.get_role_from_request(request)
    if role.is_host():
        result = create_game(request, role)
        return JsonResponse(result, status=result.get("status", 401), safe=False)
    return JsonResponse({}, status=403, safe=False)


@login_required(login_url="login")
@require_http_methods(["GET"])
def get_all_active_games_api(request: HttpRequest):
    role = RequesterRole.get_role_from_request(request)
    if role.is_host():
        games = get_all_active_games(request.user)
        result = {
            "status": 200 if games is not None else 403,
            "data": games,
            "error": "Could not fetch data" if games is None else None,
        }
        return JsonResponse(result, status=result.get("status", 401), safe=False)
    return JsonResponse([], status=403, safe=False)

@login_required(login_url="login")
@require_http_methods(["PUT"])
def put_team_name_api(request: HttpRequest, gameid, teamnumber: int = None):
    role = RequesterRole.get_role_from_request(request)
    if teamnumber is None:
        teamnumber = request.user.team
    result = set_team_name(request, role, gameid, teamnumber)
    return JsonResponse(result, status=result.get("status", 403), safe=False)
