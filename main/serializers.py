from rest_framework import serializers

from .models import Calendar, Team, Title


class TitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Title
        fields = "__all__"


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = "__all__"


class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = "__all__"
