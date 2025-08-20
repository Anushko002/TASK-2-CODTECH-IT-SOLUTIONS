const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

// Serve static frontend files
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // When a message is received
  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", { id: socket.id, text: msg });
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

http.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
