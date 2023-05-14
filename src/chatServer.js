import express from "express";
import http, { METHODS } from "http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
const server = http.createServer(app);
// app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`a user is connected with ID-${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join("123");
    console.log("joined");
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to("123").emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});
server.listen(3000, () => {
  console.log("we dey inside");
});
