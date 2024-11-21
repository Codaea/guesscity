import type { Coordinates } from './Coordinates';
import type { Score } from './Score';


export interface serverToClientEvents {
  'room:new:success': (roomCode: string) => void;
  gameStarted: () => void;
  'player:joined': (socketId: string, username: string) => void;
  'player:left': (socketId: string) => void;
  'room:join:success': (roomCode: string) => void;
  'room:join:error': (error: string) => void;
  'room:ping:success': () => void;
  'room:ping:error': (error: string) => void;

  watch: (videoId: string) => void;
  scores: (answer: Coordinates, scores: Score[]) => void; // LEFTOFF: SHIT SCORE IMPLEMENTATION, SHIT IS READING NOT READY CLIENT SIDE. (WHY??)
}

export interface clientToServerEvents {
  'room:new': () => void;
  'room:join': (roomId: string, username: string) => void;
  'room:leave': () => void;
  'room:ping': (roomId: string) => void;
  startGame: (roomId: string) => void;

  guess: (guess: Coordinates) => void;
  nextRound: () => void;
}
