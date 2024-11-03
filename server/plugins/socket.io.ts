import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server, type Socket } from "socket.io";
import { defineEventHandler } from "h3";

import type { Video } from "~/data/videos2";
import videos from "~/data/videos2";

import type { clientToServerEvents, serverToClientEvents } from "~/types/socketio";
import type { Coordinates } from "~/types/Coordinates";
import { socket } from "~/components/socket";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server<clientToServerEvents, serverToClientEvents>();
  io.bind(engine);

  const _roomManager = new RoomManager(io)

  // TODO: fix this, but for now, DON't TOUCH
  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    },
    websocket: {},
  }
  ));
});

interface Room {
  sockets: Set<Socket>;
}

/**
 * Manages the rooms and starts games.
 */
class RoomManager {
  private io: Server;
  private rooms: Map<string, Room>; // room-code, room and its sockets

  constructor(io: Server) {
    this.io = io;
    this.rooms = new Map();

    this.io.on("connection", (socket) => {
      //
      console.log(`${socket.id} connected`); // DEBUG

      socket.on("newRoom", () => this.createRoom(socket));
      socket.on("joinRoom", (roomCode: string) => this.joinRoom(socket, roomCode));
      socket.on("leaveRoom", () => this.leaveRoom(socket));

      socket.on("startGame", () => this.startGame(socket))

      socket.on("disconnect", () => this.handleDisconnect(socket));
    })
  }

  // Create a new room, add them to rooms set
  private createRoom(socket: Socket) {
    const roomCode = Math.random().toString(36).substring(7);
    this.rooms.set(roomCode, { sockets: new Set([socket]) });
    socket.emit("roomCode", roomCode);
    console.log(`User created room: ${roomCode}`); // DEBUG
  }

  private joinRoom(socket: Socket, roomCode: string) {
    const room = this.rooms.get(roomCode);
    if (!room) return; // TODO: handle error and tell them the room doesn't exist
    room.sockets.add(socket);
    socket.emit("joinedRoom", roomCode);
    console.log(`Socket ${socket.id} joined room: ${roomCode}`); // DEBUG
  }

  // Leave a room
  private leaveRoom(socket: Socket) {
    for (const [roomCode, room] of this.rooms.entries()) {
      if (room.sockets.delete(socket)) {
        console.log(`Socket ${socket.id} left room: ${roomCode}`);
        if (room.sockets.size === 0) {
          this.rooms.delete(roomCode);
          console.log(`Room ${roomCode} deleted as it is now empty`);
        }
        break;
      }
    }
  }

  private startGame(socket: Socket) {
    const room = this.findRoom(socket);
    if (!room) return; // TODO: handle error and tell them they are not in a room
    const _game = new Game(room);
  }

  private handleDisconnect(socket: Socket) {
    this.leaveRoom(socket);
    const room = this.findRoom(socket);
    if (!room) return;
    // TODO: inform the game for the room that a player has disconnected 
    console.log(`Socket ${socket.id} disconnected`); // DEBUG
  }

  private findRoom(socket: Socket): Room | undefined {
    for (const room of this.rooms.values()) {
      if (room.sockets.has(socket)) {
        return room;
      }
    }
    return undefined;
  }

}

class Game {
  private room: Room; // contains socket objects
  private scores: Map<string, number> = new Map(); // socket-id to score

  constructor(room: Room) {
    this.room = room;
    this.scores = new Map();

    this.start();
  }

  // Run on the start of the game
  async start() {
    console.log('starting game');

    // Notify clients to redirect to the game page

    this.room.sockets.forEach(socket => {
      socket.emit("gameStarted");
    });

    // Start the game loop
    await this.gameLoop();

  }

  private async gameLoop() {
    // /lobby 
    for (let i = 0; i < 3; i++) { // 3 rounds
      await this.round();
    }
    // /end
    console.log('Game ended'); // DEBUG
    this.room.sockets.forEach(socket => {
      socket.emit('gameEnded', this.scores);
    });
  }

  async round() {
    const video = pickVideo();
    this.room.sockets.forEach(socket => {
      socket.emit("watch", video.videoId);
    });

    // /gameblock
    await this.guessPhase();
    // /answer/sent

    console.log('Guess phase ended'); // DEBUG
    // /answer/result for user /host/result for host
    this.broadcastScores();

    await new Promise<void>((resolve) => {
      this.room.sockets.forEach(socket => {
        socket.on('nextRound', () => {
          resolve();
        });
      });
    })    
  }

  // Handles the guessing phase
  async guessPhase(): Promise<void> {

    return new Promise((resolve) => {
      // force resolve at end of guess phase
      const timeoutId = setTimeout(() => {
        console.log('guess phase timed out');
        resolve();
      }, 30000); // 30 seconds

      const guessed: Array<string> = []; // [socket-id] of users who have guessed

      // listen to guesses
      this.room.sockets.forEach(socket => {
        socket.on('guess', (guess: Coordinates) => {
          console.log(`Guess: ${guess}`);

          // score user

          const score = 100 // TODO: score user
          this.scores.set(socket.id, (this.scores.get(socket.id) || 0) + score);

          // end round early logic

          // input validation
          if (!guessed.includes(socket.id)) {
            guessed.push(socket.id);
          }

          if (guessed.length === this.room.sockets.size - 1) { // -1 for the host 
            clearTimeout(timeoutId)
            console.log('All users have guessed, ending early');
            resolve();
          }
        });
      });
    })
  }

  // Broadcasts the final scores to all users in the room
  broadcastScores() {
    this.room.sockets.forEach(socket => socket.emit('scores', this.scores));
    console.log('Scores broadcasted:', this.scores);
  }

  /* // TODO: implement
  playerDisconnected(socket: Socket) {
  }
  */
}

function pickVideo(): Video {
  // Pick a random video from the list
  return videos[Math.floor(Math.random() * videos.length)];
}