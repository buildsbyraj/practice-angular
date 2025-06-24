import { Server } from "socket.io";

export const setupSocket = (io: Server) => {
  // io.on("connection", (socket) => {
  //   console.log("🔌 A user connected:", socket.id);

  //   socket.on("send_message", (message) => {
  //     console.log("📨 Message received:", message);
  //     io.emit("receive_message", message); // Broadcast to all
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("❌ User disconnected:", socket.id);
  //   });
  // });
};
