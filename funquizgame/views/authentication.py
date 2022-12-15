from django.http.request import HttpRequest
from django.contrib.auth import logout
from django.shortcuts import redirect, render, reverse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from funquizgame.actions.user_actions import (
    login_user_access_code_get,
    login_user_access_code_post,
    login_user_user_name,
    activate_user_action,
)

@require_http_methods(["POST", "GET"])
def authenticate_user_access_code(request: HttpRequest):
    user = game = None
    if request.method == "POST":
        user, game = login_user_access_code_post(request)
    if request.method == "GET":
        user, game = login_user_access_code_get(request)
    if user is None or game is None:
        return render(
            request,
            "login.html",
            {
                "errormessage": "Access code is invalid",
                "access_code": request.POST.get("access_code", ""),
            },
        )
    if not user.user_is_active():
        return redirect(reverse("user_data") + f'?game_id={game.unid}')
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
@require_http_methods(["POST"])
def activate_user(request: HttpRequest):
    user, game = activate_user_action(request)
    if user is None or game is None:
        return render(
            request,
            "login.html",
            {
                "game_id": request.POST.get('game_id', None)
            },
        )
    return redirect(reverse("active_game", args=[game.unid]))

@require_http_methods(["GET"])
def logout_request(request: HttpRequest):
    logout(request)
    return redirect(reverse("login"))