import logging
import uuid

from django.db import models
from django.urls import reverse


class MultiLanguageField(models.Model):
    unid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True)

    def prepare_data(self):
        pass

    def get_all_text(self) -> list:
        result = []
        for text in self.textfield_set.all().order_by('sort_order'):
            result.append(text.json())
        return list(filter(lambda x: x is not None, result))

    def json(self) -> dict:
        return {
            'id': self.unid,
            'text': self.get_all_text()
        }

    def create_text(self, textlist: list) -> list:
        from funquizgame.models.text_field import TextField
        result = []
        for text in textlist:
            try:
                text_object = TextField.from_json(text, self)
                if text_object is None:
                    return None
                result.append(text_object)
            except Exception as e:
                logging.error(e)
                return None
        return result
