from django.urls import path

from .views import GamesView, TeamListView, TeamsView

urlpatterns = [
    path("games/", GamesView.as_view(), name="games"),
    path("table/", TeamsView.as_view(), name="table"),
    path("teams/", TeamListView.as_view(), name="teams"),
]
