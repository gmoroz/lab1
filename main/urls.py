from django.urls import path
from django.views.generic import TemplateView
from rest_framework.routers import SimpleRouter

from .views import (
    GameFormViewForCreate,
    GameViewSet,
    TeamFormViewForCreate,
    TeamViewSet,
    TitleViewSet,
    TournamentView,
)

router = SimpleRouter()
router.register("teams", TeamViewSet, basename="teams")
router.register("titles", TitleViewSet, basename="titles")
router.register("games", GameViewSet, basename="games")

urlpatterns = [
    path("table/", TournamentView.as_view(), name="table"),
    path(
        "teams/create/",
        TeamFormViewForCreate.as_view(),
        name="teams-create",
    ),
    path(
        "titles/create/",
        TemplateView.as_view(template_name="title_create.html"),
        name="titles-create",
    ),
    path("games/create/", GameFormViewForCreate.as_view(), name="game-create"),
]

urlpatterns += router.urls
