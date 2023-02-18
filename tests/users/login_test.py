import pytest
from django.contrib.auth.models import User
from django.urls import reverse


@pytest.mark.django_db
def test_login_view_success(client, user_data):
    user = User.objects.create_user(
        username=user_data["username"], password=user_data["password"],
    )
    response = client.post(reverse("login"), data=user_data)

    # Проверяем, что пользователь авторизован
    assert response.status_code == 302
    assert response.url == reverse("main")

    # Проверяем, что клиент получает cookie
    assert client.cookies.get("sessionid") is not None

    # Проверяем, что аутентификация работает правильно
    assert client.login(
        username=user_data["username"], password=user_data["password"],
    )


@pytest.mark.django_db
def test_login_view_anonymous_redirect(client):
    # Отправляем GET запрос на страницу main
    response = client.get(reverse("main"))

    # Проверяем, что анонимный пользователь перенаправляется на страницу авторизации
    assert response.status_code == 302
    assert response.url == reverse("login") + "?next=/"


@pytest.mark.django_db
def test_login_view_failure(client):
    # Отправляем неверные данные пользователя
    invalid_data = {"username": "invalid_user", "password": "invalid_password"}
    response = client.post(reverse("login"), data=invalid_data)

    # Проверяем, что пользователь не авторизован
    assert response.status_code == 200
    assert response.context["error"] == "Неправильный логин или пароль."
    assert client.cookies.get("sessionid") is None
