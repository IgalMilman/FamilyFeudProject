from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.http.request import HttpRequest
from django.contrib.auth import logout
from django.shortcuts import redirect, render, reverse
from django.views.decorators.http import require_http_methods
from funquizgame.actions.game_actions import (
    create_game,
    perform_action_on_game,
    set_team_name,
)
from funquizgame.actions.question_actions import (
    complete_question,
    create_question_handler,
    give_answer,
    reveal_answer,
    reveal_question,
)
from funquizgame.actions.user_actions import (
    login_user_access_code,
    login_user_as_viewer,
    login_user_user_name,
)
from funquizgame.common.common_types import RequesterRole
from funquizgame.data_getters.game import check_game_host, get_all_active_games, get_game
from funquizgame.data_getters.question import (
    get_all_questions,
    get_all_questions_of_type,
    get_question_data,
    get_real_question,
)
from django.views.decorators.csrf import ensure_csrf_cookie


@require_http_methods(["GET"])
@login_required(login_url="login")
@ensure_csrf_cookie
def homepage(request: HttpRequest):
    return redirect(reverse("login"))


@require_http_methods(["GET"])
@login_required(login_url="login")
@ensure_csrf_cookie
def active_game(request: HttpRequest, gameid):
    role = RequesterRole.get_role_from_request(request)
    if role.is_host() and not check_game_host(request.user, gameid):
        login_user_as_viewer(request)
    return render(
        request,
        "index.html",
        {"role": request.user.role, "teamnumber": request.user.team, "gameid": gameid},
    )

@require_http_methods(["GET"])
@ensure_csrf_cookie
def login_page(request: HttpRequest):
    return render(request, "login.html")


@require_http_methods(["POST"])
def authenticate_user_access_code(request: HttpRequest):
    user, game = login_user_access_code(request)
    if user is None or game is None:
        return render(
            request,
            "login.html",
            {
                "errormessage": "Access code is invalid",
                "access_code": request.POST.get("access_code", ""),
            },
        )
    return redirect(reverse("active_game", args=[game.unid]))


@require_http_methods(["POST"])
def authenticate_user_username(request: HttpRequest):
    user = login_user_user_name(request)
    if user is None:
        return render(
            request,
            "login.html",
            {
                "errormessage": "Username or password are incorrect",
                "username": request.POST.get("username", ""),
            },
        )
    return redirect(reverse("host_settings"))


@login_required(login_url="login")
@require_http_methods(["GET"])
def host_settings(request: HttpRequest):
    role = RequesterRole.get_role_from_request(request)
    if not role.is_host():
        return redirect(reverse("homepage"))
    return render(request, "hostsettings.html")


@require_http_methods(["GET"])
def logout_request(request: HttpRequest):
    logout(request)
    return redirect(reverse("login"))


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
def question_answer_api(request: HttpRequest, gameid, questionid):
    role = RequesterRole.get_role_from_request(request)
    if request.method == "PUT":
        result = give_answer(request, role, gameid, questionid)
        return JsonResponse(result, status=result.get("status", 403), safe=False)
    return JsonResponse({}, status=200, safe=False)


@login_required(login_url="login")
@require_http_methods(["PUT"])
def question_reveal_api(request: HttpRequest, gameid, questionid):
    role = RequesterRole.get_role_from_request(request)
    if request.method == "PUT":
        if role.is_host():
            result = reveal_question(request, role, gameid, questionid)
            return JsonResponse(result, status=result.get("status", 403), safe=False)
        else:
            return JsonResponse({}, status=403, safe=False)
    return JsonResponse({}, status=200, safe=False)


@login_required(login_url="login")
@require_http_methods(["PUT"])
def question_complete_api(request: HttpRequest, gameid, questionid):
    role = RequesterRole.get_role_from_request(request)
    if request.method == "PUT":
        if role.is_host():
            result = complete_question(request, role, gameid, questionid)
            return JsonResponse(result, status=result.get("status", 403), safe=False)
        else:
            return JsonResponse({}, status=403, safe=False)
    return JsonResponse({}, status=200, safe=False)


@login_required(login_url="login")
@require_http_methods(["PUT"])
def answer_reveal_api(request: HttpRequest, gameid, answerid):
    role = RequesterRole.get_role_from_request(request)
    if request.method == "PUT":
        if role.is_host():
            result = reveal_answer(request, role, gameid, answerid)
            return JsonResponse(result, status=result.get("status", 403), safe=False)
        else:
            return JsonResponse({}, status=403, safe=False)
    return JsonResponse({}, status=200, safe=False)


@login_required(login_url="login")
@require_http_methods(["PUT"])
def create_question_api(request: HttpRequest):
    result = create_question_handler(request)
    return JsonResponse(result, status=result.get("status", 403), safe=False)


@login_required(login_url="login")
@require_http_methods(["PUT"])
def put_team_name_api(request: HttpRequest, gameid, teamnumber: int = None):
    role = RequesterRole.get_role_from_request(request)
    if teamnumber is None:
        teamnumber = request.user.team
    result = set_team_name(request, role, gameid, teamnumber)
    return JsonResponse(result, status=result.get("status", 403), safe=False)
