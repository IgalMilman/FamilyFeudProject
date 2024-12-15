from enum import Enum, IntEnum
from typing import List
from django.http.request import HttpRequest


class RequesterRole(Enum):
    HOST = "ht"
    VIEWER = "vw"
    PARTICIPANT = "pt"
    VIEWER_PARTICIPANT = "vp"

    def is_host(self) -> bool:
        return self is RequesterRole.HOST

    def is_participant(self) -> bool:
        return self is RequesterRole.PARTICIPANT
    
    def is_viewer_participant(self) -> bool:
        return self is RequesterRole.VIEWER_PARTICIPANT

    @classmethod
    def has_value(cls, value) -> bool:
        return value in cls._value2member_map_

    @classmethod
    def get_valid_values(cls) -> List[str]:
        return [member.value for member in list(cls)]

    @staticmethod
    def get_valid_choices():
        return [(RequesterRole.HOST.value, "Host"),
                (RequesterRole.VIEWER.value, "Viewer"),
                (RequesterRole.PARTICIPANT.value, "Participant"),
                (RequesterRole.VIEWER_PARTICIPANT.value, "Viewer participant")]

    @classmethod
    def get_role_from_request(cls, request: HttpRequest) -> 'RequesterRole':
        if request.user.is_authenticated and cls.has_value(request.user.role):
            return cls(request.user.role)
        role = request.headers.get('UserRole', None)
        if cls.has_value(role):
            return cls(role)
        role = request.GET.get('role', 'vw')
        if cls.has_value(role):
            return cls(role)
        return cls.VIEWER

    @classmethod
    def get_role_for_user(cls, user: 'GameUser') -> 'RequesterRole':
        if user is None:
            return cls.VIEWER
        if cls.has_value(user.role):
            return cls(user.role)
        return cls.VIEWER


class GameQuestionTypes(IntEnum):
    NUMBER_ENTER = 1
    FIRST_BUTTON = 2
    FAMILY_FUID = 3
    OPEN_QUESTION = 4

    @classmethod
    def has_value(cls, value) -> bool:
        return value in cls._value2member_map_

    @classmethod
    def get_valid_values(cls) -> List[int]:
        return [member.value for member in list(cls)]

    @staticmethod
    def get_valid_choices():
        return [(GameQuestionTypes.NUMBER_ENTER.value, "Enter a number"),
                (GameQuestionTypes.FIRST_BUTTON.value, "First button click"),
                (GameQuestionTypes.FAMILY_FUID.value, "Family feud type"),
                (GameQuestionTypes.OPEN_QUESTION.value, "Open ended question")]


class GAME_STATUSES(Enum):
    BEGINNING = 'beg'
    SETTING_TEAMS = 'st'
    CHOOSING_TEAMS = 'ct'
    DASHBOARD = 'dash'
    BETTING = 'bet'
    QUESTION = 'ques'
    SURVEY = 'surv'
    ENDING = 'end'

    @classmethod
    def has_value(cls, value) -> bool:
        return value in cls._value2member_map_

    @classmethod
    def get_valid_values(cls) -> List[int]:
        return [member.value for member in list(cls)]

    @staticmethod
    def get_valid_choices():
        return [(GAME_STATUSES.BEGINNING.value, "Beginning"),
                (GAME_STATUSES.SETTING_TEAMS.value, "Setting teams"),
                (GAME_STATUSES.CHOOSING_TEAMS.value, "Choosing teams"),
                (GAME_STATUSES.DASHBOARD.value, "Dashboard"),
                (GAME_STATUSES.BETTING.value, "Betting"),
                (GAME_STATUSES.QUESTION.value, "Question"),
                (GAME_STATUSES.SURVEY.value, "Survey"),
                (GAME_STATUSES.ENDING.value, "Ending")]


class SurveyQuestionTypes(IntEnum):
    NUMBER_ENTER = 1
    TEXT_ENTRY = 2
    MULTI_LINE_TEXT_ENTRY = 3
    OPTION_SELECT = 4
    PLAYER_SELECT = 5

    @classmethod
    def has_value(cls, value) -> bool:
        return value in cls._value2member_map_

    @classmethod
    def get_valid_values(cls) -> List[int]:
        return [member.value for member in list(cls)]

    @staticmethod
    def get_valid_choices():
        return [(SurveyQuestionTypes.NUMBER_ENTER.value, "Enter a number"),
                (SurveyQuestionTypes.TEXT_ENTRY.value, "Enter short text"),
                (SurveyQuestionTypes.MULTI_LINE_TEXT_ENTRY.value, "Enter multiline text"),
                (SurveyQuestionTypes.OPTION_SELECT.value, "Select from options"),
                (SurveyQuestionTypes.PLAYER_SELECT.value, "Select a player")]