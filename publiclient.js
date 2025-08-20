const socket = io();

const form = document.getElementById("chat-form");
const input = document.getElementById("msg-input");
const messages = document.getElementById("messages");

// Receive message from server
socket.on("chatMessage", (data) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.textContent = `User ${data.id.slice(0,5)}: ${data.text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight; // auto scroll
});

// Send message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chatMessage", input.value);
    input.value = "";
  }
});
