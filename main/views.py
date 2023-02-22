import logging
from typing import Any

from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.viewsets import ModelViewSet

from .models import Calendar, Team, Title
from .serializers import CalendarSerializer, TeamSerializer, TitleSerializer

logger = logging.getLogger(__name__)


class GameViewSet(LoginRequiredMixin, ModelViewSet):
    queryset = (
        Calendar.objects.all()
        .prefetch_related("teams")
        .order_by(
            "date_of_the_match",
        )
    )
    serializer_class = CalendarSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        if judge := self.request.GET.get("judge"):
            queryset = queryset.filter(main_judge__iexact=judge)
        if team := self.request.GET.get("team"):
            queryset = queryset.filter(teams__name__iexact=team)

        return render(request, "games/games_list.html", {"games": queryset})

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        teams = Team.objects.all()
        return render(request, "games/game.html", {"game": instance, "teams": teams})


class TournamentView(LoginRequiredMixin, TemplateView):
    template_name = "table.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["teams"] = Team.objects.values(
            "name",
            "games_count",
            "points",
        ).order_by("-points")
        return context


class TeamViewSet(LoginRequiredMixin, ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        return render(request, "teams/teams_list.html", {"teams": queryset})

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        titles = Title.objects.all()
        return render(
            request,
            "teams/team.html",
            {
                "team": instance,
                "all_titles": titles,
            },
        )


class TeamFormViewForCreate(LoginRequiredMixin, TemplateView):
    template_name = "teams/team_create.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["titles"] = Title.objects.all()
        return context


class GameFormViewForCreate(LoginRequiredMixin, TemplateView):
    template_name = "games/game_create.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["teams"] = Team.objects.all()
        return context


class TitleViewSet(LoginRequiredMixin, ModelViewSet):
    queryset = Title.objects.all()
    serializer_class = TitleSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        return render(request, "titles/titles_list.html", {"titles": queryset})

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        return render(request, "titles/title.html", {"title": instance})
