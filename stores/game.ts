import { getSocket } from '~/components/socket';
import type { Coordinates } from '~/types/Coordinates';
import type { Score } from '~/types/Score';

export const useGameStore = defineStore('game', {
  state: () => ({
    socket: getSocket(),
    videoId: '',
    scores: [] as Score[],
    answer: null as Coordinates | null,
    guess: null as Coordinates | null,
    room: '',
    host: false,
  }),
  actions: {
    init() {
      const socket = this.socket;
      const router = useRouter();

      socket.on('watch', (newVideoId) => {
        this.videoId = newVideoId;
        console.log('Video:', this.videoId);
        if (this.host) {
          router.push('/online/host/gameblock');
          return;
        }
        router.push('/online/gameblock');
      });

      socket.on('scores', (newAnswer, newScores) => {
        this.answer = newAnswer;
        this.scores = newScores;
        console.log('Guess:', this.guess);
        console.log('Answer:', newAnswer);
        console.log('Scores:', newScores);
        if (this.host) {
          router.push('/online/host/result');
          return;
        }
        router.push('/online/answer/result');
      });

      socket.on('room:new:success', (roomCode) => {
        this.room = roomCode;
        this.host = true;
      });

      socket.on('room:join:success', (roomCode) => {
        this.room = roomCode;
        router.push('/online/lobby');
      });
    },
  },
});
/*
    const socket = getSocket();
    const router = useRouter();

    const videoId = ref('');
    const scores = ref({});
    const answer = ref<Coordinates | null>(null);
    const guess = ref<Coordinates | null>(null);
    const room = ref('');
    const host = ref(false);
    const listenersInitialized = ref(false);

    function setGuess(coordinates: Coordinates) {
        guess.value = coordinates;
    }

    function initializeListeners() {
        if (listenersInitialized.value) {
            return;
        }

        socket.on('watch', (newVideoId) => {
            videoId.value = newVideoId;
            console.log('Video:', videoId.value);
            if (host.value) {
                router.push('/online/host/gameblock');
                return;
            }
            router.push('/online/gameblock');
        });

        socket.on('scores', (newAnswer, newScores) => {
            answer.value = newAnswer;
            scores.value = newScores;
            console.log('Guess:', guess.value);
            console.log('Answer:', newAnswer);
            if (host.value) {
                router.push('/online/host/result');
                return;
            }
            router.push('/online/answer/result');
        });

        socket.on('room:new:success', (roomCode) => {
            room.value = roomCode;
            host.value = true;
        });

        socket.on('room:join:success', (roomCode) => {
            room.value = roomCode;
            router.push('/online/lobby');
        });

        listenersInitialized.value = true;
    }


    // prob waste cpu time but idgaf
    initializeListeners();

    return {
        socket,
        videoId,
        scores,
        answer,
        guess,
        room,
        host,
        setGuess,
    };
});
*/
