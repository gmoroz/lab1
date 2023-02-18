import pytest
from django.contrib.auth.models import User
from django.test import Client


@pytest.fixture
def user():
    user = User.objects.create_user(
        username="testuser", password="testpassword",
    )
    return user


@pytest.fixture
def client():
    client = Client()
    return client
