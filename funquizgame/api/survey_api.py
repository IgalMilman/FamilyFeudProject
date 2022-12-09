from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.http.request import HttpRequest
from django.views.decorators.http import require_http_methods
from funquizgame.actions.survey_actions import (
    upsert_survey,
    upsert_survey_answer,
    upsert_survey_question,
)
from funquizgame.common.common_types import RequesterRole
from funquizgame.data_getters.survey import (
    get_survey,
    get_survey_with_answers,
    get_all_available_surveys,
)


@login_required(login_url="login")
@require_http_methods(["GET"])
def get_survey_api(request: HttpRequest, survey_id):
    result = get_survey(survey_id)
    return JsonResponse(result, status=result.get("status", 200), safe=False)


@login_required(login_url="login")
@require_http_methods(["GET"])
def get_survey_for_game_api(request: HttpRequest, gameid, survey_id):
    result = get_survey(survey_id)
    return JsonResponse(result, status=result.get("status", 200), safe=False)


@login_required(login_url="login")
@require_http_methods(["GET"])
def get_all_surveys_api(request: HttpRequest):
    result = get_all_available_surveys(
        role=RequesterRole.get_role_from_request(request), user=request.user
    )
    return JsonResponse(result, status=200, safe=False)


@login_required(login_url="login")
@require_http_methods(["GET"])
def get_all_surveys_with_answers_api(request: HttpRequest, gameid, survey_id):
    result = get_survey_with_answers(survey_id=survey_id, game_id=gameid)
    return JsonResponse(result, status=result.get("status", 200), safe=False)


@login_required(login_url="login")
@require_http_methods(["PUT"])
def upsert_survey_api(request: HttpRequest):
    result = upsert_survey(request)
    return JsonResponse(result, status=result.get('status', 200), safe=False)


@login_required(login_url="login")
@require_http_methods(["PUT"])
def upsert_survey_answer_api(request: HttpRequest, gameid, survey_id):
    result = upsert_survey_answer(request, gameid, survey_id)
    return JsonResponse(result, status=result.get('status', 200), safe=False)
