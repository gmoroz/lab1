from django.contrib.auth.decorators import login_required
from django.urls import include, path
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter

from .views import ChatViewSet, RoomView, login_view, logout_view, register_view

router = DefaultRouter()
router.register("chats", ChatViewSet, basename="chats")
urlpatterns = [
    path("login/", login_view, name="login"),
    path("register/", register_view, name="register"),
    path("logout/", logout_view, name="logout"),
    path("chat/<str:room_name>/", RoomView.as_view()),
    path(
        "chat/",
        login_required(TemplateView.as_view(template_name="select_chat.html")),
        name="chat",
    ),
    path("", include(router.urls)),
    path(
        "chat/<str:name>/", ChatViewSet.as_view({"get": "retrieve"}), name="chat-detail",
    ),
]
