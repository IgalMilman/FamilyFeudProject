import uuid

from django.db import models
from django.db.models.deletion import CASCADE

from funquizgame.models.multi_language_item import MultiLanguageField

class TextField(models.Model):
    unid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    related_object = models.ForeignKey(MultiLanguageField, on_delete=CASCADE, null=False, blank=False, db_index=True)
    sort_order = models.SmallIntegerField("Order", default=0)
    text = models.TextField("Section text", null=True, blank=True)

    def json(self) -> str:
        return self.text

    @staticmethod
    def from_json(json:dict, language_field: MultiLanguageField):
        if 'text' in json:
            [obj, _] = TextField.objects.get_or_create(sort_order=json.get('sort_order', 0), related_object = language_field)
            obj.text = json['text']
            obj.save()
            return obj
        else:
            return None