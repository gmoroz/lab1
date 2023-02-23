from django.contrib.auth.models import User
from django.db import models


class Chat(models.Model):
    name = models.CharField(unique=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Message(models.Model):
    chat = models.ForeignKey(
        Chat,
        on_delete=models.CASCADE,
        to_field="name",
        related_name="messages",
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, to_field="username",
    )
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
