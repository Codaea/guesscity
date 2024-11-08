export interface serverToClientEvents {
    'room:new:success': (roomCode: string) => void;
    gameStarted: () => void;
    'player:joined': (socketId: string, username: string) => void;
    'player:left': (socketId: string) => void;
    'room:join:success': (roomCode: string) => void;
    'room:join:error': (error: string) => void;

    watch: (videoId: string) => void;
    scores: (scores: Record<string, number>) => void;
}

export interface clientToServerEvents {
    'room:new': () => void;
    'room:join': (roomId:string, username: string) => void;
    'room:leave': () => void;
    startGame: (roomId: string) => void;

    guess: (guess: Coordinates) => void;
    nextRound: () => void;
}