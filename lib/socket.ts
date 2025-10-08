import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000", {
      transports: ["websocket"],
      withCredentials: true,
      autoConnect: true,
    });

    console.log("✅ Socket connected");
  }
  return socket;
};

export const getSocket = (): Socket | null => {
  if (!socket) return null;
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("❌ Socket disconnected");
  }
};
