import { Server } from "socket.io";
const connections = {};
const messages = {};
const timeOnline = {};

export const connectToSocket = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    socket.on("join-call", (path) => {
      connections[path] ??= [];
      connections[path].push(socket.id);
      timeOnline[socket.id] = Date.now();

      for (const socketId of connections[path]) {
        io.to(socketId).emit("user-joined", socket.id, connections[path]);
      }

      for (const message of messages[path] ?? []) {
        socket.emit(
          "chat-message",
          message.data,
          message.sender,
          message["socket-id-sender"]
        );
      }
    });

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {
      const room = Object.keys(connections).find((path) =>
        connections[path].includes(socket.id)
      );

      if (!room) return;

      messages[room] ??= [];
      messages[room].push({
        sender,
        data,
        "socket-id-sender": socket.id,
      });

      for (const socketId of connections[room]) {
        io.to(socketId).emit("chat-message", data, sender, socket.id);
      }
    });

    socket.on("disconnect", () => {
      for (const [room, socketIds] of Object.entries(connections)) {
        const index = socketIds.indexOf(socket.id);
        if (index === -1) continue;

        for (const socketId of socketIds) {
          io.to(socketId).emit("user-left", socket.id);
        }

        socketIds.splice(index, 1);
        if (socketIds.length === 0) delete connections[room];
        break;
      }

      delete timeOnline[socket.id];
    });
  });

  return io;
};