from django.urls import path
from . import authentication
from . import pages

views_urlpatterns = [
    path('<uuid:gameid>', pages.active_game, name='active_game'),
    path('host-settings', pages.host_settings, name='host_settings'),
    path('', pages.homepage, name=''),
    path('', pages.homepage, name='homepage'),
    path('login', pages.login_page, name='login'),
    path('user_data', pages.user_data, name='user_data'),
    
    path('user/activate', authentication.activate_user, name='activate_user'),
    path('login/accesscode', authentication.authenticate_user_access_code, name='login_access_code'),
    path('login/username', authentication.authenticate_user_username, name='login_username'),
    path('logout', authentication.logout_request, name='logout'),
]