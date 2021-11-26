from django.conf import settings
from django.shortcuts import reverse


def global_settings(request):
    return {
        'VERSION_STATIC_FILES': True if settings.VERSION_STATIC_FILES else False,
        'PROGRAM_VERSION': settings.SOFTWARE_VERSION,
        'URL_ADD_TO_STATIC_FILES': '?v='+settings.STATIC_FILES_VERSION if settings.VERSION_STATIC_FILES else '',
        'needdatatables': False,
        'needquillinput': False,
        'EMAIL_URL_FOR_LINKS': settings.EMAIL_HOST_LINK,
        'LOGO_ALT_NAME': settings.SOFTWARE_NAME,
        'SUPPORT_EMAIL': settings.SUPPORT_EMAIL,
        'SOFTWARE_NAME': settings.SOFTWARE_NAME,
        'SOFTWARE_NAME_SHORT': settings.SOFTWARE_NAME_SHORT,
        'MENU_ITEMS': [{ 'label': 'Homepage', 'link': reverse('homepage'), 'accessible': True}, 
],
    }
