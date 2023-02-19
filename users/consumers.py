import json

from channels.generic.websocket import AsyncWebsocketConsumer


class ChatRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "chat_%s" % self.room_name

        # Присоединяемся к группе комнаты
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Удаляем себя из группы комнаты
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        # Отправляем сообщение в группу комнаты
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "chat_message", "message": message},
        )

    async def chat_message(self, event):
        message = event["message"]

        # Отправляем сообщение на WebSocket
        await self.send(text_data=json.dumps({"message": message}))
