from typing import Any

from django.db.models import OuterRef, Subquery
from django.views.generic import TemplateView

from .models import Calendar, Team


class GamesView(TemplateView):
    template_name = "games.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        subquery_team1 = Subquery(
            Team.objects.filter(
                calendar__pk=OuterRef("pk"),
            ).values("name")[:1],
        )
        subquery_team2 = Subquery(
            Team.objects.filter(
                calendar__pk=OuterRef("pk"),
            ).values("name")[1:2],
        )
        context["games"] = (
            Calendar.objects.annotate(
                team1_name=subquery_team1, team2_name=subquery_team2,
            )
            .values(
                "date_of_the_match",
                "team1_name",
                "team2_name",
                "main_judge",
                "result",
            )
            .order_by("date_of_the_match")
        )
        return context
