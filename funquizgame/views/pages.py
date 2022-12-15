from django.contrib.auth.decorators import login_required
from django.http.request import HttpRequest
from django.shortcuts import redirect, render, reverse
from django.views.decorators.http import require_http_methods
from funquizgame.actions.user_actions import (
    login_user_as_viewer,
)
from funquizgame.common.common_types import RequesterRole
from funquizgame.data_getters.game import check_game_host
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
    if not request.user.user_is_active():
        return redirect(reverse("user_data") + f'?game_id={gameid}')
    return render(
        request,
        "index.html",
        {"role": request.user.role, "teamnumber": request.user.team, "gameid": gameid},
    )

@require_http_methods(["GET"])
@ensure_csrf_cookie
def login_page(request: HttpRequest):
    access_code = request.GET.get('access_code', None)
    return render(request, "login.html", {} if access_code is None else {
        'access_code': access_code
    })

@require_http_methods(["GET"])
@login_required(login_url="login")
@ensure_csrf_cookie
def user_data(request: HttpRequest):
    game_id = request.GET.get('game_id', None)
    return render(request, "user_data.html", {} if game_id is None else {
        'game_id': game_id
    })

@login_required(login_url="login")
@require_http_methods(["GET"])
def host_settings(request: HttpRequest):
    role = RequesterRole.get_role_from_request(request)
    if not role.is_host():
        return redirect(reverse("homepage"))
    return render(request, "hostsettings.html")
