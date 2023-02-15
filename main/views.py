from typing import Any

from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.viewsets import ModelViewSet

from .models import Calendar, Team
from .serializers import TeamSerializer


class GamesView(TemplateView):
    template_name = "games.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)

        games_qs = Calendar.objects.prefetch_related("teams").order_by(
            "date_of_the_match",
        )

        if judge := self.request.GET.get("judge"):
            games_qs = games_qs.filter(main_judge__iexact=judge)
        if team := self.request.GET.get("team"):
            games_qs = games_qs.filter(teams__name__iexact=team)

        context["games"] = games_qs
        return context


class TournamentView(TemplateView):
    template_name = "tournament_table.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["teams"] = Team.objects.values(
            "name",
            "games_count",
            "points",
        ).order_by("-points")
        return context


class TeamViewSet(ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        return render(request, "teams.html", {"teams": queryset})

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        return render(request, "team.html", {"team": instance})
