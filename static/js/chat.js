$(function () {
  var url = window.location.href;
  var room_name = url.match(/\/chat\/(.*)\//)[1];
  var socket = new WebSocket(
    "ws://" + window.location.host + "/ws/chat/" + room_name + "/"
  );

  // Функция для добавления сообщений на страницу
  function addMessages(messages) {
    messages.forEach(function (message) {
      var username = message.username;
      var text = message.message;
      $("#messages").append($("<li>").text(username + ": " + text));
    });
  }

  // Обработчик события WebSocket-соединения
  socket.onopen = function () {
    $.ajax({
      url: "/messages/" + room_name + "/",
      type: "GET",
      success: function (response) {
        var messages = response;
        addMessages(messages);
      },
    });
  };

  // Обработчик события получения сообщения по WebSocket
  socket.onmessage = function (e) {
    var data = JSON.parse(e.data);
    var message = data["message"];
    var username = data["username"];
    $("#messages").append($("<li>").text(username + ": " + message));
  };

  $("#message-input").on("keydown", function (e) {
    if (e.keyCode === 13) {
      var messageInputDom = this;
      var message = messageInputDom.value;
      var username = $("#username").val();
      socket.send(JSON.stringify({ message: message, username: username }));
      messageInputDom.value = "";
    }
  });

  $("#send-button").on("click", function () {
    var messageInputDom = $("#message-input");
    var message = messageInputDom.val();
    var username = $("#username").val();
    socket.send(JSON.stringify({ message: message, username: username }));
    messageInputDom.val("");
  });
});
