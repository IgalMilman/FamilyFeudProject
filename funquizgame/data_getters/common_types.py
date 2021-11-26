
from django.http.request import HttpRequest


class RequesterRole:
    HOST = "ht"
    VIEWER = "vw"
    PARTICIPANT = "pt"
    VALID_ROLES=[HOST, VIEWER, PARTICIPANT]

    @staticmethod
    def get_role_from_request(request:HttpRequest)->str:
        role = request.GET.get('role', 'vw')
        if role not in RequesterRole.VALID_ROLES:
            role = RequesterRole.VIEWER
        return role
        


class QuestionTypes:
    NUMBER_ENTER = 1
    FIRST_BUTTON = 2
    FAMILY_FUID = 3
    CHOICES = [(NUMBER_ENTER, "Enter a number"),
               (FIRST_BUTTON, "First button click"),
               (FAMILY_FUID, "Family feud type")]


class GAME_STATUSES:
    BEGINNING = 'beg'
    SETTING_TEAMS = 'st'
    DASHBOARD = 'dash'
    QUESTION = 'ques'
    ENDING = 'end'
    VALID_VALUES = [BEGINNING, SETTING_TEAMS, DASHBOARD, QUESTION, ENDING]
    CHOICES = [(BEGINNING, "Beginning"),
               (SETTING_TEAMS, "Setting teams"),
               (DASHBOARD, "Dashboard"),
               (QUESTION, "Question"),
               (ENDING, "Ending")]