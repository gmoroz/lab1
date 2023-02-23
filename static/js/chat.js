$(document).ready(function () {
  var url = window.location.href;
  var room_name = url.match(/\/chat\/(.*)\//)[1];
  const username = $("#username").val();
  const messages = $("#messages");

  // Функция для получения списка сообщений по AJAX-запросу
  function getMessages() {
    $.ajax({
      url: `/chats/${room_name}/`,
      type: "GET",
      success: function (response) {
        messages.empty();
        response.forEach((message) => {
          messages.append(`<li>${message.user}: ${message.text}</li>`);
        });
      },
    });
  }

  // Получаем список сообщений при загрузке страницы
  getMessages();

  // Обработчик события отправки нового сообщения
  $("#send-button").click(function () {
    const text = $("#message-input").val();
    $.ajax({
      url: `/chats/${room_name}/`,
      type: "PUT",
      data: {
        text: text,
        username: username,
      },
      success: function () {
        $("#message-input").val("");
        getMessages();
      },
    });
  });

  // WebSocket-соединение для получения новых сообщений
  const chatSocket = new WebSocket(
    "ws://" + window.location.host + `/ws/chat/${room_name}/`
  );

  chatSocket.onmessage = function (event) {
    const message = JSON.parse(event.data);
    messages.append(`<li>${message.username}: ${message.text}</li>`);
  };
});
