import pytest
from rest_framework.test import APIClient

from main.models import Calendar, Team


@pytest.fixture
def user_data():
    return {
        "username": "test_user",
        "password": "testpass",
        "confirm_password": "testpass",
    }


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
@pytest.mark.django_db
def team():
    return Team.objects.create(
        name="Test Team",
        country="Test Country",
        city="Test City",
        coach="Test Coach",
        points=10,
        games_count=5,
    )


@pytest.fixture
@pytest.mark.django_db
def calendar(team):
    calendar = Calendar.objects.create(
        date_of_the_match="2023-02-15",
        main_judge="Test Judge",
    )
    calendar.teams.add(team)
    calendar.teams.add(team)
    return calendar
