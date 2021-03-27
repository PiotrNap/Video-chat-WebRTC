const express = require("express");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 3000;

// paste your IP address of the local network
const HOST = "192.168.0.5";

// specify the self-signed certificate for https connection
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
};
const server = require("https").createServer(options, app);
const io = require("socket.io")(server);

app.use(express.static("public"));

var socketRoom;

io.on("connection", socket => {
  console.log("user connected to the socket");

  socket.on("room", room => {
    io.emit("room", room);
  });

  socket.on("join", room => {
    socketRoom = room;
    socket.join(socketRoom);
    socket.to(socketRoom).emit("join", room);
  });

  socket.on("offer", offer => {
    socket.to(socketRoom).emit("offer", offer);
  });

  socket.on("answer", answer => {
    socket.to(socketRoom).emit("answer", answer);
  });

  socket.on("candidate", candidate => {
    socket.to(socketRoom).emit("candidate", candidate);
  });
});

server.listen(PORT, HOST, () => {
  console.log("Server is listening: ", PORT);
});
