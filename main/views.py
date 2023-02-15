from typing import Any

from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import generics
from rest_framework.renderers import TemplateHTMLRenderer

from .models import Calendar, Team


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


class TeamsView(TemplateView):
    template_name = "tournament_table.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["teams"] = Team.objects.values(
            "name",
            "games_count",
            "points",
        ).order_by("-points")
        return context


class TeamListView(generics.ListAPIView):
    queryset = Team.objects.all()
    renderer_classes = (TemplateHTMLRenderer,)

    def list(self, request, *args, **kwargs):
        return render(request, "teams.html", {"teams": self.queryset.all()})
