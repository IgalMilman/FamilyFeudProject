from django.conf import settings
from django.shortcuts import reverse


def global_settings(request):
    return {
        'VERSION_STATIC_FILES': True if settings.VERSION_STATIC_FILES else False,
        'URL_ADD_TO_STATIC_FILES': '?v='+settings.STATIC_FILES_VERSION if settings.VERSION_STATIC_FILES else '',
        'PROPS': ''
    }
