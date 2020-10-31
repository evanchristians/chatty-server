import express from "express";
import socketio from "socket.io";
import http from "http";
import { PORT } from "./constants";
import router from "./router";
import { addUser, getUser } from "./users";
import User from "./types/User";

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(router);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback: CallableFunction) => {
    if (room && name) {
      console.log("someone joined")
      const { error, user } = <{ error: string | undefined; user: User }>(
        addUser({ id: socket.id, name, room })
      );

      if (error) return callback(error);

      // socket.emit("message", {
      //   user: "admin",
      //   text: `${user.name}, joined ${user.room}`,
      // });

      socket.broadcast
        .to(user.room)
        .emit("message", { user: "admin", text: `${user.name} joined` });
      socket.join(user.room);
    }

    return callback ? callback() : null;
  });

  socket.on("sendMessage", async (message: string, callback) => {
    const user = <User>getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    return callback ? callback() : null;
  });

  socket.on("disconnect", () => {
    console.log("someone left");
  });
});

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
