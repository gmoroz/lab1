$(document).ready(function () {
  $("#chat-form").submit(function (event) {
    event.preventDefault();
    const roomName = $("#room-name").val();
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(roomName)) {
      alert("Название комнаты может содержать только цифры и латиницу.");
      return;
    }
    const username = $("#username").val();
    $.ajax({
      url: "/chats/",
      type: "POST",
      data: {
        name: roomName,
        username: username,
        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
      },
      success: function (response) {
        window.location.href = `/chat/${roomName}/`;
      },
    });
  });
});
