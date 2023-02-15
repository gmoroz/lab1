from typing import Any

from django.views.generic import TemplateView

from .models import Calendar


class GamesView(TemplateView):
    template_name = "games.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)

        games_qs = Calendar.objects.prefetch_related("teams").order_by(
            "date_of_the_match",
        )

        context["games"] = games_qs
        return context
