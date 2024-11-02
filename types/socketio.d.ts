export interface serverToClientEvents {
    roomCode: (roomCode: string) => void;
    gameStarted: () => void;
    watch: (videoId: string) => void;
    scores: (scores: Record<string, number>) => void;
}

export interface clientToServerEvents {
    newRoom: () => void;
    joinRoom: (roomCode: string) => void;
    leaveRoom: () => void;
    startGame: (roomId: string) => void;

    guess: (guess: Coordinates) => void;
    nextRound: () => void;
}