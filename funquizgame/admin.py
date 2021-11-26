from django.contrib import admin
from funquizgame.models.answer_data import AnswerData
from funquizgame.models.game import Game
from funquizgame.models.multi_language_item import MultiLanguageField
from funquizgame.models.question_data import QuestionData
from funquizgame.models.real_answer import RealAnswer
from funquizgame.models.real_data_abstract import RealDataAbstract
from funquizgame.models.real_question import QuestionData
from funquizgame.models.team import Team
from funquizgame.models.text_field import TextField

@admin.register(AnswerData, QuestionData, Game, MultiLanguageField, TextField)
class DataAdmin(admin.ModelAdmin):
    pass