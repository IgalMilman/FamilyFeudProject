import logging
import uuid

from django.db import models


class MultiLanguageField(models.Model):
    unid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True
    )

    def prepare_data(self):
        pass

    def get_all_text(self) -> list:
        return [text.json() for text in self.textfield_set.all().order_by('sort_order')]

    def json(self, text_field_name: str = 'text') -> dict:
        return {'id': self.unid, text_field_name: self.get_all_text()}

    def upsert_text(self, textlist: list) -> list:
        from funquizgame.models.text_field import TextField
        result = []
        updated_ids = set()
        for text in textlist:
            try:
                text_object = TextField.from_json(text, self)
                if text_object is None:
                    return None
                result.append(text_object)
                updated_ids.add(text_object.unid)
            except Exception as e:
                logging.error(e)
                return None
        if self.unid is not None:
            for text in self.textfield_set.all():
                if text.unid not in updated_ids:
                    text.delete()
        return result
