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
    return render(
        request,
        "index.html",
        {"role": request.user.role, "teamnumber": request.user.team, "gameid": gameid},
    )

@require_http_methods(["GET"])
@ensure_csrf_cookie
def login_page(request: HttpRequest):
    return render(request, "login.html")

@login_required(login_url="login")
@require_http_methods(["GET"])
def host_settings(request: HttpRequest):
    role = RequesterRole.get_role_from_request(request)
    if not role.is_host():
        return redirect(reverse("homepage"))
    return render(request, "hostsettings.html")
