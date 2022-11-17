from django.http.request import HttpRequest
from django.contrib.auth import logout
from django.shortcuts import redirect, render, reverse
from django.views.decorators.http import require_http_methods
from funquizgame.actions.user_actions import (
    login_user_access_code,
    login_user_user_name,
)

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

@require_http_methods(["GET"])
def logout_request(request: HttpRequest):
    logout(request)
    return redirect(reverse("login"))