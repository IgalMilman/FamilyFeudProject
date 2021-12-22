"""funquizgame URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import handler404
from django.contrib import admin
from django.urls import path

from funquizgame import error_views as error_views
# from funquizgame import loginform as funquizgame_loginform
from funquizgame import views as funquizgame_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('<uuid:gameid>', funquizgame_views.active_game, name='active_game'),
    path('host-settings', funquizgame_views.host_settings, name='host_settings'),
    path('', funquizgame_views.homepage, name=''),
    path('', funquizgame_views.homepage, name='homepage'),
    path('v', funquizgame_views.homepage_viewer, name='viewer'),
    path('h', funquizgame_views.homepage_host, name='host'),
    path('p<int:teamnumber>', funquizgame_views.homepage_participant, name='participant'),
    path('api/game/<uuid:gameid>/question/data/<uuid:questionid>', funquizgame_views.question_data_api, name='api_question_data'),
    path('api/game/<uuid:gameid>/question/<uuid:questionid>', funquizgame_views.question_api, name='api_question'),
    path('api/game/<uuid:gameid>/question/<uuid:questionid>/reveal', funquizgame_views.question_reveal_api, name='api_question_reveal'),
    path('api/game/<uuid:gameid>/question/<uuid:questionid>/complete', funquizgame_views.question_complete_api, name='api_question_complete'),
    path('api/game/<uuid:gameid>/question/<uuid:questionid>/answer', funquizgame_views.question_answer_api, name='api_question_answer'),
    path('api/game/<uuid:gameid>/question/all/', funquizgame_views.question_get_all_api, name='api_question_get_all'),
    path('api/game/<uuid:gameid>/question/all/<int:questiontype>', funquizgame_views.question_get_all_type_api, name='api_question_get_all_type'),
    path('api/game/<uuid:gameid>/answer/<uuid:answerid>/reveal', funquizgame_views.answer_reveal_api, name='api_answer_reveal'),
    path('api/game/<uuid:gameid>', funquizgame_views.game_api, name='api_game'),
    path('api/game/<uuid:gameid>/', funquizgame_views.game_api),
    path('api/game/create', funquizgame_views.create_game_api, name='api_create_game'),
    path('api/game/all', funquizgame_views.get_all_active_games_api, name='api_available_game'),
    #path('api/game/current', funquizgame_views.game_current_api, name='api_game_current'),
    path('api/question/create', funquizgame_views.create_question_api, name='api_create_question'),
    path('api/game/<uuid:gameid>/team/<int:teamnumber>/name', funquizgame_views.put_team_name_api, name='set_team_number_name_api'),
    path('api/game/<uuid:gameid>/team/name', funquizgame_views.put_team_name_api, name='set_team_name_api'),
    path('login', funquizgame_views.login_page, name='login'),
    path('login/accesscode', funquizgame_views.authenticate_user_access_code, name='login_access_code'),
    path('login/username', funquizgame_views.authenticate_user_username, name='login_username'),
    path('logout', funquizgame_views.logout_request, name='logout'),
]

handler404 = 'funquizgame.error_views.view_404' 
