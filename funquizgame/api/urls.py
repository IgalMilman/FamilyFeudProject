from django.urls import path

from . import game_api
from . import question_api
from . import survey_api

api_urlpatterns = [

    path('api/game/<uuid:gameid>/team/<int:teamnumber>/name', game_api.put_team_name_api, name='set_team_number_name_api'),
    path('api/game/<uuid:gameid>/team/name', game_api.put_team_name_api, name='set_team_name_api'),
    path('api/question/data/<uuid:questionid>', question_api.question_api, name='api_question_data'),
    path('api/game/<uuid:gameid>/question/<uuid:questionid>/reveal', question_api.question_reveal_api, name='api_question_reveal'),
    path('api/game/<uuid:gameid>/question/<uuid:questionid>/complete', question_api.question_complete_api, name='api_question_complete'),
    path('api/game/<uuid:gameid>/question/<uuid:questionid>/answer', question_api.question_answer_api, name='api_question_answer'),
    path('api/game/<uuid:gameid>/question/all/', question_api.question_get_all_api_for_game, name='api_question_get_all'),
    path('api/game/<uuid:gameid>/question/all/<int:questiontype>', question_api.question_get_all_type_api_for_game, name='api_question_get_all_type'),
    path('api/game/<uuid:gameid>/answer/<uuid:answerid>/reveal', question_api.answer_reveal_api, name='api_answer_reveal'),
    path('api/game/<uuid:gameid>', game_api.game_api, name='api_game'),
    path('api/game/<uuid:gameid>/', game_api.game_api),
    path('api/game/create', game_api.create_game_api, name='api_create_game'),
    path('api/game/all', game_api.get_all_active_games_api, name='api_available_game'),


    path('api/question/<uuid:questionid>', question_api.question_api, name='api_question'),
    path('api/question/upsert', question_api.create_question_api, name='api_upsert_question'),
    path('api/question/all', question_api.question_get_all_api, name='api_query_questions'),

    path('api/survey/<uuid:survey_id>', survey_api.get_survey_api, name='api_get_survey'),
    path('api/game/<uuid:gameid>/survey/<uuid:survey_id>', survey_api.get_survey_api, name='api_get_survey_for_game'),
    path('api/survey/all', survey_api.get_all_surveys_api, name='api_get_all_surveys'),
    path('api/game/<uuid:gameid>/surveys/<uuid:survey_id>/answers', survey_api.get_all_surveys_with_answers_api, name='api_get_survey_with_answers'),
    path('api/survey/upsert', survey_api.upsert_survey_api, name='api_upsert_survey'),
    path('api/game/<uuid:gameid>/survey/<uuid:survey_id>/answer/upsert', survey_api.upsert_survey_answer_api, name='api_upsert_survey_answer'),
]