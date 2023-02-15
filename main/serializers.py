from rest_framework import serializers

from .models import Calendar, Team, Titul


class TitulSerializer(serializers.ModelSerializer):
    class Meta:
        model = Titul
        exclude = ("pk",)


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        exclude = ("pk",)


class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        exclude = ("pk",)
