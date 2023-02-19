from django.urls import path

from .views import GetRoomMessages, RoomView, login_view, logout_view, register_view

urlpatterns = [
    path("login/", login_view, name="login"),
    path("register/", register_view, name="register"),
    path("logout/", logout_view, name="logout"),
    path("chat/<str:room_name>/", RoomView.as_view()),
    path("messages/<str:room>/", GetRoomMessages.as_view()),
]
