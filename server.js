const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

var socketRoom;

io.on("connection", (socket) => {
  console.log("user connected to the socket");

  socket.on("room", (room) => {
    io.emit("room", room);
  });

  socket.on("join", (room) => {
    socketRoom = room;
    socket.join(socketRoom);
    socket.to(socketRoom).emit("join", room);
  });

  socket.on("offer", (offer) => {
    socket.to(socketRoom).emit("offer", offer);
  });

  socket.on("answer", (answer) => {
    socket.to(socketRoom).emit("answer", answer);
  });

  socket.on("candidate", (candidate) => {
    socket.to(socketRoom).emit("candidate", candidate);
  });
});

server.listen(PORT, () => {
  console.log("Server is listening: ", PORT);
});
