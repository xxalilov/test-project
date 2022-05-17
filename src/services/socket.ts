import { Server } from "socket.io";

const socket = (httpServer: any) => {
  let users: any = [];

  const addUser = (userId: any, socketId: any) => {
    !users.some((user: any) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId: any) => {
    users = users.filter((user: any) => user.socketId !== socketId);
  };

  const getUser = (userId: any) => {
    return users.find((user: any) => user.userId === userId);
  };

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    // send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });

    // disconnect user
    socket.on("disconnect", () => {
      console.log("User disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};

export { socket };
