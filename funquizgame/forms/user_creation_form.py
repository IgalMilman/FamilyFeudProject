from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from funquizgame.models.users.game_user import GameUser

class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = GameUser
        fields = ('username', 'email', 'password')

class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = GameUser
        fields = ('username', 'email', 'password')