$(function () {
  // Get the room name from the URL
  var room_name = window.location.pathname.split("/")[2];

  // Get the username
  var username = $("#username").val();

  // Connect to the WebSocket
  var socket = new WebSocket(
    "ws://" + window.location.host + "/ws/chat/" + room_name + "/"
  );

  // Function for scrolling to the bottom of the messages container
  function scrollMessagesContainer() {
    var messagesContainer = $(".messages-container");
    messagesContainer.scrollTop(messagesContainer.prop("scrollHeight"));
  }

  // Handle incoming WebSocket messages
  socket.onmessage = function (event) {
    var data = JSON.parse(event.data);
    var message = $("<li>");
    var usernameSpan = $("<span>")
      .addClass("username")
      .text(data.username + ": ");
    var textSpan = $("<span>").addClass("text").text(data.text);
    message.append(usernameSpan);
    message.append(textSpan);
    $("#messages").append(message);
    scrollMessagesContainer();
  };

  // Send a message to the server
  function sendMessage() {
    var messageInput = $("#message-input");
    var messageText = messageInput.val().trim();
    if (messageText) {
      var data = {
        text: messageText,
      };
      socket.send(JSON.stringify(data));
      messageInput.val("");
    }
  }

  // Handle sending a message when the send button is clicked
  $("#send-button").click(function () {
    sendMessage();
  });

  // Handle sending a message when the enter key is pressed
  $("#message-input").keypress(function (event) {
    if (event.keyCode == 13) {
      sendMessage();
      event.preventDefault();
    }
  });

  // Load initial messages from the server
  $.get("/chats/" + room_name + "/", function (data) {
    for (var i = 0; i < data.length; i++) {
      var message = $("<li>");
      var usernameSpan = $("<span>")
        .addClass("username")
        .text(data[i].username + ": ");
      var textSpan = $("<span>").addClass("text").text(data[i].text);
      message.append(usernameSpan);
      message.append(textSpan);
      $("#messages").append(message);
    }
    scrollMessagesContainer();
  });
});
