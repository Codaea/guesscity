// one instance of socket io for the enire app
import { io, type Socket } from "socket.io-client";
import type { serverToClientEvents, clientToServerEvents } from "~/types/socketio";

const socket: Socket<serverToClientEvents, clientToServerEvents> = io();
const connected = computed(() => socket.connected);
socket.on("connect", () => {
  console.log("connected to server");
});

socket.on("disconnect", () => {
  console.log("disconnected from server");
});

export {socket, connected };
