from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import (
    GamesView,
    TeamFormViewForCreate,
    TeamViewSet,
    TitleViewSet,
    TournamentView,
)

router = SimpleRouter()
router.register("teams", TeamViewSet, basename="teams")
router.register("titles", TitleViewSet, basename="titles")


urlpatterns = [
    path("games/", GamesView.as_view(), name="games"),
    path("table/", TournamentView.as_view(), name="table"),
    path(
        "teams/create/",
        TeamFormViewForCreate.as_view(),
        name="teams-create",
    ),
]

urlpatterns += router.urls
