// one instance of socket io for the entire app
import { io, type Socket } from 'socket.io-client';
import type {
  serverToClientEvents,
  clientToServerEvents,
} from '~/types/socketio';

let socket: Socket<serverToClientEvents, clientToServerEvents> | null = null;

const connected = computed(() => socket?.connected ?? false);

function getSocket() {
  if (!socket) {
    socket = io();
  }
  return socket;
}

export { getSocket, connect, connected };
