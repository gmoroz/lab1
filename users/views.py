from typing import Any

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.shortcuts import redirect, render
from django.views.generic import TemplateView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Chat
from .serializers import ChatSerializer


def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("main")
        else:
            return render(
                request,
                "login.html",
                {
                    "error": "Неправильный логин или пароль.",
                },
            )
    else:
        return render(request, "login.html")


def logout_view(request):
    logout(request)
    return redirect("login")


def register_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        confirm_password = request.POST["confirm_password"]

        if password != confirm_password:
            error = "Пароли не совпадают"
            return render(request, "register.html", {"error": error})
        if User.objects.filter(username=username).first():
            error = "Пользователь с таким именем уже существует!"
            return render(request, "register.html", {"error": error})

        User.objects.create_user(username, password=password)
        return redirect("login")

    return render(request, "register.html")


class RoomView(LoginRequiredMixin, TemplateView):
    template_name = "chat.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["room_name"] = self.kwargs.get("room_name")
        return context


class ChatViewSet(ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def retrieve(self, request, *args, **kwargs):
        chat = self.get_object()
        serializer = self.get_serializer(chat)
        messages = serializer.data["messages"]
        return Response(messages)
