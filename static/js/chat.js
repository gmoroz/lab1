const roomName = window.location.pathname.split("/").filter(Boolean).pop();

const chatSocket = new WebSocket(
  "ws://" + window.location.host + "/ws/chat/" + roomName + "/"
);

chatSocket.onmessage = function (e) {
  const data = JSON.parse(e.data);
  console.log(data);
  if (data.tester) {
    document.querySelector("#user-hello").innerHTML = data.tester;
  } else if (data.message) {
    const messageElement = document.createElement("li");
    messageElement.textContent = `${data.username}: ${data.message}`;
    document.querySelector("#messages").appendChild(messageElement);
  }
};

const sendButton = document.querySelector("#send-button");
const messageInputDom = document.querySelector("#message-input");
const username = document.getElementById("username").value;

sendButton.onclick = function (event) {
  const messageContent = messageInputDom.value;
  chatSocket.send(
    JSON.stringify({
      message: messageContent,
      username: username,
    })
  );
  messageInputDom.value = "";
};
