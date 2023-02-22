from rest_framework import serializers

from .models import Calendar, Team, Title


class TitleSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Title
        fields = ["user_id", "name"]


class TeamSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Team
        fields = "__all__"


class CalendarSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Calendar
        fields = "__all__"
