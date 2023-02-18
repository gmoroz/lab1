import pytest
from django.test import Client


@pytest.fixture
def user_data():
    return {
        "username": "jdssd",
        "password": "testpass",
        "confirm_password": "testpass",
    }


@pytest.fixture
def client():
    client = Client()
    return client
