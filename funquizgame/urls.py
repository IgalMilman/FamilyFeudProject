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
from django.contrib.auth import views as auth_views
from django.shortcuts import reverse
from django.urls import include, path, re_path, reverse_lazy

from funquizgame import error_views as error_views
# from funquizgame import loginform as funquizgame_loginform
from funquizgame import views as funquizgame_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', funquizgame_views.homepage, name='homepage'),
    path('', funquizgame_views.homepage, name=''),
    path('v', funquizgame_views.homepage_viewer, name='viewer'),
    path('h', funquizgame_views.homepage_host, name='host'),
    path('p<int:teamnumber>', funquizgame_views.homepage_participant, name='participant'),
    path('api/question/data/<uuid:questionid>', funquizgame_views.question_data_api, name='api_question_data'),
    path('api/question/<uuid:questionid>', funquizgame_views.question_api, name='api_question'),
    path('api/question/<uuid:questionid>/reveal', funquizgame_views.question_reveal_api, name='api_question_reveal'),
    path('api/question/<uuid:questionid>/complete', funquizgame_views.question_complete_api, name='api_question_complete'),
    path('api/question/<uuid:questionid>/answer', funquizgame_views.question_answer_api, name='api_question_answer'),
    path('api/question/all/<uuid:gameid>', funquizgame_views.question_get_all_api, name='api_question_get_all'),
    path('api/question/all/<uuid:gameid>/<int:questiontype>', funquizgame_views.question_get_all_type_api, name='api_question_get_all_type'),
    path('api/answer/<uuid:answerid>/reveal', funquizgame_views.answer_reveal_api, name='api_answer_reveal'),
    path('api/game/<uuid:gameid>', funquizgame_views.game_api, name='api_game'),
    path('api/game/current', funquizgame_views.game_current_api, name='api_game_current'),
    path('api/question/create', funquizgame_views.create_question_api, name='create_question'),
    path('api/team/<int:teamnumber>/name', funquizgame_views.put_team_name_api, name='set_team_name_api')
]

handler404 = error_views.view_404 
