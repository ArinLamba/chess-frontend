// @/lib/socket.ts
import { io, Socket } from "socket.io-client";

export const socket: Socket = (() => {
  return io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001", {
    transports: ["websocket", "polling"], // allow both
    withCredentials: true,
    autoConnect: true,
  });
})();

