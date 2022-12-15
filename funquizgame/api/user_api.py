from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.http.request import HttpRequest
from django.views.decorators.http import require_http_methods

from funquizgame.actions.user_actions import (
    deactivate_user, generate_users_and_access_codes, get_active_users_for_game,
    get_all_users_and_access_codes_for_game, get_available_access_codes,
    make_user_a_captain, add_user_to_a_team)
from funquizgame.common.common_types import RequesterRole


@login_required(login_url="login")
@require_http_methods(["GET"])
def get_available_access_codes_api(request: HttpRequest, gameid):
    role = RequesterRole.get_role_from_request(request)
    if not role.is_host():
        return JsonResponse({}, status=401)
    result = get_available_access_codes(request, gameid)
    return JsonResponse(result, status=200, safe=False)


@login_required(login_url="login")
@require_http_methods(["GET"])
def generate_users_and_access_codes_api(request: HttpRequest, gameid, number):
    role = RequesterRole.get_role_from_request(request)
    if not role.is_host():
        return JsonResponse({}, status=401)
    result = generate_users_and_access_codes(request, gameid, number)
    return JsonResponse(result, status=200, safe=False)


@login_required(login_url="login")
@require_http_methods(["GET"])
def get_all_users_and_access_codes_for_game_api(request: HttpRequest, gameid):
    role = RequesterRole.get_role_from_request(request)
    if not role.is_host():
        return JsonResponse({}, status=401)
    result = get_all_users_and_access_codes_for_game(request, gameid)
    return JsonResponse(result, status=200, safe=False)


@login_required(login_url="login")
@require_http_methods(["GET"])
def get_all_active_users_for_game_api(request: HttpRequest, gameid):
    result = {
        'teams': get_active_users_for_game(request, gameid),
        'self': request.user.json_full()
    }
    return JsonResponse(result, status=200, safe=False)


@login_required(login_url="login")
@require_http_methods(["GET"])
def make_user_captain_api(request: HttpRequest, gameid, user_id: int):
    role = RequesterRole.get_role_from_request(request)
    if not role.is_host():
        return JsonResponse({}, status=401)
    result = make_user_a_captain(gameid, user_id)
    return JsonResponse(result, status=result.get('status', 200), safe=False)


@login_required(login_url="login")
@require_http_methods(["GET"])
def assign_user_to_team_api(request: HttpRequest, gameid, team_number, user_id: int):
    role = RequesterRole.get_role_from_request(request)
    if not role.is_host():
        return JsonResponse({}, status=401)
    result = add_user_to_a_team(gameid, team_number, user_id)
    return JsonResponse(result, status=result.get('status', 200), safe=False)


@login_required(login_url="login")
@require_http_methods(["GET"])
def deactivate_user_api(request: HttpRequest, user_id: int):
    role = RequesterRole.get_role_from_request(request)
    if not role.is_host():
        return JsonResponse({}, status=401)
    result = deactivate_user(user_id)
    return JsonResponse(result, status=result.get('status', 200), safe=False)
        
