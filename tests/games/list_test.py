import pytest
from django.urls import reverse
from rest_framework import status


@pytest.mark.django_db
def test_list_games(client, calendar):
    url = reverse("games-list")
    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_filter_games_by_judge(client, calendar):
    url = reverse("games-list")
    response = client.get(url, {"judge": "Test Judge"})
    assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_filter_games_by_team(client, calendar):
    url = reverse("games-list")
    response = client.get(url, {"team": "Test Team"})
    assert response.status_code == status.HTTP_200_OK
