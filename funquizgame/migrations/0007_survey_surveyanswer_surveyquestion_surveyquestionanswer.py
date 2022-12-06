# Generated by Django 3.2.9 on 2022-12-06 00:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('funquizgame', '0006_game_created_by'),
    ]

    operations = [
        migrations.CreateModel(
            name='Survey',
            fields=[
                ('multilanguagefield_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='funquizgame.multilanguagefield')),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created time')),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            bases=('funquizgame.multilanguagefield',),
        ),
        migrations.CreateModel(
            name='SurveyAnswer',
            fields=[
                ('unid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created time')),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('game', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='survey_answers', to='funquizgame.game')),
                ('survey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='survey_answers', to='funquizgame.survey')),
            ],
        ),
        migrations.CreateModel(
            name='SurveyQuestion',
            fields=[
                ('multilanguagefield_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='funquizgame.multilanguagefield')),
                ('type', models.SmallIntegerField(choices=[(1, 'Enter a number'), (2, 'Enter short text'), (3, 'Enter multiline text'), (4, 'Select from options'), (5, 'Select a player')], verbose_name='Question type*')),
                ('parameters', models.JSONField(blank=True, default=dict, null=True, verbose_name='parameters')),
                ('priority', models.IntegerField(default=0, verbose_name='Priority')),
                ('survey_field', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='funquizgame.survey')),
            ],
            bases=('funquizgame.multilanguagefield',),
        ),
        migrations.CreateModel(
            name='SurveyQuestionAnswer',
            fields=[
                ('unid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('answer', models.JSONField(default=dict)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='funquizgame.surveyquestion')),
                ('survey_answer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='funquizgame.surveyanswer')),
            ],
        ),
    ]