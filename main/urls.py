from django.urls import path

from .views import GamesView, TeamsView

urlpatterns = [
    path("games/", GamesView.as_view(), name="games"),
    path("table/", TeamsView.as_view(), name="table"),
]
