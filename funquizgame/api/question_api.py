from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.http.request import HttpRequest
from django.views.decorators.http import require_http_methods
from funquizgame.actions.question_actions import (complete_question,
                                                  create_question_handler,
                                                  give_answer, reveal_answer, reveal_question)
from funquizgame.common.common_types import RequesterRole
from funquizgame.data_getters.question import (get_all_questions,
                                               get_all_questions_of_type,
                                               get_question_data,
                                               get_real_question)


@login_required(login_url="login")
@require_http_methods(["PUT"])
def question_answer_api(request: HttpRequest, gameid, questionid):
    role = RequesterRole.get_role_from_request(request)
    result = give_answer(request, role, gameid, questionid)
    return JsonResponse(result, status=result.get("status", 403), safe=False)


@login_required(login_url="login")
@require_http_methods(["PUT"])
def question_reveal_api(request: HttpRequest, gameid, questionid):
    role = RequesterRole.get_role_from_request(request)
    if role.is_host():
        result = reveal_question(request, role, gameid, questionid)
        return JsonResponse(result, status=result.get("status", 403), safe=False)
    else:
        return JsonResponse({}, status=403, safe=False)


@login_required(login_url="login")
@require_http_methods(["PUT"])
def question_complete_api(request: HttpRequest, gameid, questionid):
    role = RequesterRole.get_role_from_request(request)
    if role.is_host():
        result = complete_question(request, role, gameid, questionid)
        return JsonResponse(result, status=result.get("status", 403), safe=False)
    else:
        return JsonResponse({}, status=403, safe=False)


@login_required(login_url="login")
@require_http_methods(["PUT"])
def create_question_api(request: HttpRequest):
    result = create_question_handler(request)
    return JsonResponse(result, status=result.get("status", 403), safe=False)


@login_required(login_url="login")
@require_http_methods(["GET"])
def question_api(request: HttpRequest, gameid, questionid):
    role = RequesterRole.get_role_from_request(request)
    return JsonResponse(
        get_real_question(role, gameid, questionid), status=200, safe=False
    )


@login_required(login_url="login")
@require_http_methods(["GET"])
def question_data_api(request: HttpRequest, gameid, questionid):
    role = RequesterRole.get_role_from_request(request)
    return JsonResponse(
        get_question_data(role, gameid, questionid), status=200, safe=False
    )


@login_required(login_url="login")
@require_http_methods(["GET"])
def question_get_all_api(request: HttpRequest, gameid):
    role = RequesterRole.get_role_from_request(request)
    return JsonResponse(
        get_all_questions(role, request.user, gameid), status=200, safe=False
    )


@login_required(login_url="login")
@require_http_methods(["GET"])
def question_get_all_type_api(request: HttpRequest, gameid, questiontype):
    role = RequesterRole.get_role_from_request(request)
    if role.is_host():
        return JsonResponse(
            get_all_questions_of_type(role, request.user, gameid, questiontype),
            status=200,
            safe=False,
        )
    return JsonResponse({"error": "notimplemented"}, status=401, safe=False)


@login_required(login_url="login")
@require_http_methods(["PUT"])
def answer_reveal_api(request: HttpRequest, gameid, answerid):
    role = RequesterRole.get_role_from_request(request)
    if role.is_host():
        result = reveal_answer(request, role, gameid, answerid)
        return JsonResponse(result, status=result.get("status", 403), safe=False)
    else:
        return JsonResponse({}, status=403, safe=False)
