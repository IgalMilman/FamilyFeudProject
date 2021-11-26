from django.http import JsonResponse
from django.http.request import HttpRequest
from django.shortcuts import render
from django.views.decorators import csrf
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from funquizgame.actions.game_actions import (get_or_create_game,
                                              perform_action_on_game, set_team_name)
from funquizgame.actions.question_actions import (complete_question, create_question_handler,
                                                  give_answer, reveal_answer,
                                                  reveal_question)
from funquizgame.data_getters.common_types import RequesterRole
from funquizgame.data_getters.game import get_game
from funquizgame.data_getters.question import (get_all_questions,
                                               get_all_questions_of_type,
                                               get_question_data,
                                               get_real_question)


def homepage(request: HttpRequest):
    return render(request, 'index.html', {'role': 'vr', 'teamnumber': None})


def homepage_viewer(request: HttpRequest):
    return render(request, 'index.html', {'role': 'vr', 'teamnumber': None})


def homepage_host(request: HttpRequest):
    return render(request, 'index.html', {'role': 'ht', 'teamnumber': None})


def homepage_participant(request: HttpRequest, teamnumber: int):
    return render(request, 'index.html', {'role': 'pt', 'teamnumber': teamnumber})


@csrf_exempt
@require_http_methods(['GET'])
def question_api(request: HttpRequest, questionid):
    role = RequesterRole.get_role_from_request(request)
    if request.method == 'GET':
        return JsonResponse(get_real_question(role, questionid), status=200, safe=False)
    return JsonResponse({'error': 'notimplemented'}, status=401, safe=False)


@csrf_exempt
@require_http_methods(['GET'])
def question_data_api(request: HttpRequest, questionid):
    role = RequesterRole.get_role_from_request(request)
    if request.method == 'GET':
        return JsonResponse(get_question_data(role, questionid), status=200, safe=False)
    return JsonResponse({'error': 'notimplemented'}, status=401, safe=False)


@csrf_exempt
@require_http_methods(['GET'])
def question_get_all_api(request: HttpRequest, gameid):
    role = RequesterRole.get_role_from_request(request)
    if request.method == 'GET':
        return JsonResponse(get_all_questions(role, gameid), status=200, safe=False)
    return JsonResponse({'error': 'notimplemented'}, status=401, safe=False)


@csrf_exempt
@require_http_methods(['GET'])
def question_get_all_type_api(request: HttpRequest, gameid, questiontype):
    role = RequesterRole.get_role_from_request(request)
    if request.method == 'GET':
        return JsonResponse(get_all_questions_of_type(RequesterRole.HOST, gameid, questiontype), status=200, safe=False)
    return JsonResponse({'error': 'notimplemented'}, status=401, safe=False)


@csrf_exempt
@require_http_methods(['GET', 'PUT'])
def game_api(request: HttpRequest, gameid):
    role = RequesterRole.get_role_from_request(request)
    if request.method == 'GET':
        result = get_game(role, gameid)
        return JsonResponse(result, status=result.get('status', 403), safe=False)
    if request.method == 'PUT':
        if role != RequesterRole.HOST:
            return JsonResponse({}, status=403, safe=False)
        result = perform_action_on_game(request, gameid, role)
        return JsonResponse(result, status=result.get('status', 403), safe=False)
    return JsonResponse({'error': 'notimplemented'}, status=401, safe=False)


@csrf_exempt
@require_http_methods(['GET'])
def game_current_api(request: HttpRequest):
    role = RequesterRole.get_role_from_request(request)
    if request.method == 'GET':
        result = get_or_create_game(request, role)
        return JsonResponse(result.get('game', {}), status=result.get('status', 403), safe=False)
    return JsonResponse({'error': 'notimplemented'}, status=401, safe=False)


@csrf_exempt
@require_http_methods(['PUT'])
def question_answer_api(request: HttpRequest, questionid):
    role = RequesterRole.get_role_from_request(request)
    if request.method == 'PUT':
        result = give_answer(request, role, questionid)
        return JsonResponse(result, status=result.get('status', 403), safe=False)
    return JsonResponse({}, status=200, safe=False)


@csrf_exempt
@require_http_methods(['PUT'])
def question_reveal_api(request: HttpRequest, questionid):
    role = RequesterRole.get_role_from_request(request)
    if request.method == 'PUT':
        if role == RequesterRole.HOST:
            result = reveal_question(request, role, questionid)
            return JsonResponse(result, status=result.get('status', 403), safe=False)
        else:
            return JsonResponse({}, status=403, safe=False)
    return JsonResponse({}, status=200, safe=False)


@csrf_exempt
@require_http_methods(['PUT'])
def question_complete_api(request: HttpRequest, questionid):
    role = RequesterRole.get_role_from_request(request)
    if request.method == 'PUT':
        if role == RequesterRole.HOST:
            result = complete_question(request, role, questionid)
            return JsonResponse(result, status=result.get('status', 403), safe=False)
        else:
            return JsonResponse({}, status=403, safe=False)
    return JsonResponse({}, status=200, safe=False)


@csrf_exempt
@require_http_methods(['PUT'])
def answer_reveal_api(request: HttpRequest, answerid):
    role = RequesterRole.get_role_from_request(request)
    if request.method == 'PUT':
        if role == RequesterRole.HOST:
            result = reveal_answer(request, role, answerid)
            return JsonResponse(result, status=result.get('status', 403), safe=False)
        else:
            return JsonResponse({}, status=403, safe=False)
    return JsonResponse({}, status=200, safe=False)


@csrf_exempt
@require_http_methods(['PUT'])
def create_question_api(request: HttpRequest):
    result = create_question_handler(request)
    return JsonResponse(result, status=result.get('status', 403), safe=False)

@csrf_exempt
@require_http_methods(['PUT'])
def put_team_name_api(request: HttpRequest, teamnumber: int):
    role = RequesterRole.get_role_from_request(request)
    result = set_team_name(request, teamnumber, role)
    return JsonResponse(result, status=result.get('status', 403), safe=False)