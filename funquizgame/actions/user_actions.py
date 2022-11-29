from typing import Tuple

from django.contrib.auth import authenticate, login
from django.http import HttpRequest

from funquizgame.common.common_functions import is_blank
from funquizgame.models import AccessCode, Game, GameUser


def login_user_access_code(request: HttpRequest) -> Tuple[GameUser, Game]:
    access_code = request.POST.get("access_code", None)
    if is_blank(access_code):
        return None
    access_code_obj = AccessCode.get_active_access_code(access_code)
    if access_code_obj is not None:
        login(request, access_code_obj.user)
        return access_code_obj.user, access_code_obj.game
    return None


def login_user_user_name(request: HttpRequest) -> GameUser:
    username = request.POST.get("username", None)
    password = request.POST.get("password", None)
    if is_blank(username) or is_blank(password):
        return None
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return user
    return None


def login_user_as_viewer(request: HttpRequest):
    user: GameUser = GameUser.get_viewer_user()
    login(request, user)
