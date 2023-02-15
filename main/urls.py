from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import GamesView, TeamViewSet, TournamentView

router = SimpleRouter()
router.register("teams", TeamViewSet, basename="teams")


urlpatterns = [
    path("games/", GamesView.as_view(), name="games"),
    path("table/", TournamentView.as_view(), name="table"),
]

urlpatterns += router.urls
