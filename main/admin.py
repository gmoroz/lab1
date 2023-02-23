from django.contrib import admin

from .models import Calendar, Team, Title

admin.site.register(Calendar)
admin.site.register(Title)
admin.site.register(Team)
