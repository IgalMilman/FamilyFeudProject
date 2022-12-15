# Generated by Django 4.1.3 on 2022-12-12 20:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("funquizgame", "0010_remove_gameuserparticipation_is_deleted_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="team",
            name="captain",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="captain_on_teams",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
