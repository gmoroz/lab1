import pytest
from django.contrib.auth.models import User
from django.urls import reverse


@pytest.mark.django_db
def test_register_view_with_valid_data(client, user_data):
    # Test registration with valid data
    response = client.post(reverse("register"), data=user_data)
    assert response.status_code == 302
    assert User.objects.filter(username=user_data["username"]).exists()


@pytest.mark.django_db
def test_register_view_with_password_mismatch(client, user_data):
    # Test registration with password mismatch
    user_data["confirm_password"] = "wrongpass"
    response = client.post(reverse("register"), data=user_data)
    assert response.status_code == 200
    assert "Пароли не совпадают".encode("utf-8") in response.content


@pytest.mark.django_db
def test_register_view_with_existing_username(client, user_data):
    # Test registration with existing username
    User.objects.create_user(user_data["username"], password="testpass")
    user_data["confirm_password"] = "testpass"
    response = client.post(reverse("register"), data=user_data)
    assert response.status_code == 200
    assert (
        "Пользователь с таким именем уже существует".encode(
            "utf-8",
        ) in response.content
    )
