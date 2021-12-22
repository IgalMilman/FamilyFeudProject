from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from funquizgame.forms.user_creation_form import (CustomUserChangeForm,
                                                  CustomUserCreationForm)
from funquizgame.models.answer_data import AnswerData
from funquizgame.models.game import Game
from funquizgame.models.multi_language_item import MultiLanguageField
from funquizgame.models.question_data import QuestionData
from funquizgame.models.real_question import QuestionData
from funquizgame.models.text_field import TextField
from funquizgame.models.users.game_user import GameUser


@admin.register(AnswerData, QuestionData, Game, MultiLanguageField, TextField)
class DataAdmin(admin.ModelAdmin):
    pass


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = GameUser
    list_display = ('email', 'is_staff', 'is_active',)
    list_filter = ('email', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(GameUser, CustomUserAdmin)
