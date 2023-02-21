from django.contrib.auth.decorators import login_required
from django.urls import path
from django.views.generic import TemplateView

from .views import GetRoomMessages, RoomView, login_view, logout_view, register_view

urlpatterns = [
    path("login/", login_view, name="login"),
    path("register/", register_view, name="register"),
    path("logout/", logout_view, name="logout"),
    path("chat/<str:room_name>/", RoomView.as_view()),
    path("messages/<str:room>/", GetRoomMessages.as_view()),
    path(
        "chat/",
        login_required(TemplateView.as_view(template_name="select_chat.html")),
        name="chat",
    ),
]
