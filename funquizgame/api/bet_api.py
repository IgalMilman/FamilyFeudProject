from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.http.request import HttpRequest
from django.views.decorators.http import require_http_methods
from funquizgame.common.common_types import RequesterRole
from funquizgame.actions.bet_actions import (
    assign_bet_opportunity_to_question,
    assign_bet_result,
    create_and_reveal_bet_opportunity,
    place_bet,
    reveal_bet,
)

@login_required(login_url="login")
@require_http_methods(["GET"])
def create_and_reveal_bet_opportunity_api(request: HttpRequest, gameid):
    role = RequesterRole.get_role_from_request(request)
    if role.is_host():
        result = create_and_reveal_bet_opportunity(request, role, gameid)
        return JsonResponse(result, status=result.get("status", 403), safe=False)
    else:
        return JsonResponse({}, status=403, safe=False)

@login_required(login_url="login")
@require_http_methods(["GET"])
def reveal_bet_api(request: HttpRequest, gameid, betid):
    role = RequesterRole.get_role_from_request(request)
    if role.is_host():
        result = reveal_bet(request, role, gameid, betid)
        return JsonResponse(result, status=result.get("status", 403), safe=False)
    else:
        return JsonResponse({}, status=403, safe=False)

@login_required(login_url="login")
@require_http_methods(["GET"])
def assign_bet_opportunity_api(request: HttpRequest, gameid, betopportunityid, questionid):
    role = RequesterRole.get_role_from_request(request)
    if role.is_host():
        result = assign_bet_opportunity_to_question(request, role, gameid, betopportunityid, questionid)
        return JsonResponse(result, status=result.get("status", 403), safe=False)
    else:
        return JsonResponse({}, status=403, safe=False)

@login_required(login_url="login")
@require_http_methods(["GET"])
def assign_bet_result_api(request: HttpRequest, gameid, betid, result):
    role = RequesterRole.get_role_from_request(request)
    if role.is_host():
        result = assign_bet_result(request, role, gameid, betid, result)
        return JsonResponse(result, status=result.get("status", 403), safe=False)
    else:
        return JsonResponse({}, status=403, safe=False)

@login_required(login_url="login")
@require_http_methods(["GET"])
def assign_bet_result_negative_api(request: HttpRequest, gameid, betid, result):
    return assign_bet_result_api(request, gameid, betid, -result)

@login_required(login_url="login")
@require_http_methods(["PUT"])
def place_bet_api(request: HttpRequest, gameid, betopportunityid):
    role = RequesterRole.get_role_from_request(request)
    result = place_bet(request, role, gameid, betopportunityid)
    return JsonResponse(result, status=result.get("status", 403), safe=False)