# Generated by Django 4.1.3 on 2022-12-10 17:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import funquizgame.models.game_user_participation


class Migration(migrations.Migration):

    dependencies = [
        ("funquizgame", "0009_rename_accesscode_gameuserparticipation_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="gameuserparticipation",
            old_name="is_deleted",
            new_name="access_code_is_disabled",
        ),
        migrations.AlterField(
            model_name="gameuserparticipation",
            name="access_code_is_disabled",
            field=models.BooleanField(default=False, verbose_name="Is disabled"),
        ),
        migrations.AlterField(
            model_name="gameuserparticipation",
            name="access_code",
            field=models.CharField(
                default=funquizgame.models.game_user_participation.default_access_code,
                max_length=15,
                null=True,
                verbose_name="Access code",
            ),
        ),
        migrations.AlterField(
            model_name="gameuserparticipation",
            name="game",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="user_participation",
                to="funquizgame.game",
            ),
        ),
        migrations.AlterField(
            model_name="gameuserparticipation",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="game_participation",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
