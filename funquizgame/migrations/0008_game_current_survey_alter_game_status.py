# Generated by Django 4.1.3 on 2022-12-08 04:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("funquizgame", "0007_survey_surveyanswer_surveyquestion_surveyquestionanswer"),
    ]

    operations = [
        migrations.AddField(
            model_name="game",
            name="current_survey",
            field=models.UUIDField(
                blank=True, null=True, verbose_name="Current survey"
            ),
        ),
        migrations.AlterField(
            model_name="game",
            name="status",
            field=models.TextField(
                choices=[
                    ("beg", "Beginning"),
                    ("st", "Setting teams"),
                    ("dash", "Dashboard"),
                    ("ques", "Question"),
                    ("surv", "Survey"),
                    ("end", "Ending"),
                ],
                default="beg",
                verbose_name="Current game status",
            ),
        ),
    ]
