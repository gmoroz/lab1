import os

import django
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

from users.routing import websocket_urlpatterns

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tournament.settings")
django_asgi_app = get_asgi_application()


application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": AuthMiddlewareStack(URLRouter(websocket_urlpatterns)),
    },
)


def load_django():
    django.setup()


worker_preload = load_django
