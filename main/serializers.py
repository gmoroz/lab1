from rest_framework import serializers

from .models import Calendar, Team, Titul


class TitulSerializer(serializers.ModelSerializer):
    class Meta:
        model = Titul
        fields = "__all__"


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = "__all__"


class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = "__all__"
