from typing import Any

from django.views.generic import TemplateView

from .models import Calendar


class GamesView(TemplateView):
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["games"] = Calendar.objects.order_by("date_of_the_match").all()
        return context
