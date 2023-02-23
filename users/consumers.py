import json

from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User

from .models import Chat, Message


class ChatRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        text = text_data_json["text"]
        username = self.scope["user"].username
        user = await database_sync_to_async(User.objects.get)(username=username)
        chat = await database_sync_to_async(Chat.objects.get)(name=self.room_name)
        await sync_to_async(Message.objects.create)(
            text=text,
            user=user,
            chat=chat,
        )

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": text,
                "username": username,
            },
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event["message"]
        username = event["username"]

        # Send message to WebSocket
        await self.send(
            text_data=json.dumps({"text": message, "username": username}),
        )
