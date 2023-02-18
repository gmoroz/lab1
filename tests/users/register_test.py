import pytest
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status


@pytest.mark.django_db
def test_register_view_with_valid_data(client, user_data):
    response = client.post(reverse("register"), data=user_data)
    assert response.status_code == status.HTTP_302_FOUND
    assert User.objects.filter(username=user_data["username"]).exists()


@pytest.mark.django_db
def test_register_view_with_password_mismatch(client, user_data):
    user_data["confirm_password"] = "wrongpass"
    response = client.post(reverse("register"), data=user_data)
    assert response.status_code == status.HTTP_200_OK
    assert "Пароли не совпадают".encode("utf-8") in response.content


@pytest.mark.django_db
def test_register_view_with_existing_username(client, user_data):
    User.objects.create_user(user_data["username"], password="testpass")
    user_data["confirm_password"] = "testpass"
    response = client.post(reverse("register"), data=user_data)
    assert response.status_code == status.HTTP_200_OK
    assert (
        "Пользователь с таким именем уже существует".encode(
            "utf-8",
        )
        in response.content
    )
