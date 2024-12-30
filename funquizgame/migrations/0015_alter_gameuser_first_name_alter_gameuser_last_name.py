# Generated by Django 4.1.3 on 2024-12-30 23:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("funquizgame", "0014_realanswer_text_answer"),
    ]

    operations = [
        migrations.AlterField(
            model_name="gameuser",
            name="first_name",
            field=models.TextField(
                blank=True, max_length=150, verbose_name="first name"
            ),
        ),
        migrations.AlterField(
            model_name="gameuser",
            name="last_name",
            field=models.TextField(
                blank=True, max_length=150, verbose_name="last name"
            ),
        ),
    ]
