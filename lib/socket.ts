// @/lib/socket.ts
import { io, Socket } from "socket.io-client";

export const socket: Socket = (() => {
  return io(process.env.ORIGIN || "http://localhost:4000", {
    transports: ["websocket", "polling"], // allow both
    withCredentials: true,
    autoConnect: true,
  });
})();

