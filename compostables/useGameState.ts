import { getSocket } from "~/components/socket";

let listenersInitialized = false;

export function useGameState() {
    const socket = getSocket();
    const router = useRouter();

    const videoId = ref('');
    const scores = ref({});
    const room = ref(''); // Room code
    const host = ref(false);

    function initializeListeners() {
        if (listenersInitialized) {
            return;
        }
        socket.on('watch', (newVideoId) => {
            videoId.value = newVideoId;
            if (host.value) {
                router.push('/online/host/gameblock');
                return;
            }
            router.push('/online/gameblock');
        });

        socket.on('scores', (newScores) => {
            scores.value = newScores;
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

        listenersInitialized = true;
    }

    // Auto-initialize listeners when composable is used
    onMounted(() => {
        initializeListeners();
    })

    return {
        videoId,
        scores,
        room,
        host,
        initializeListeners
    }
}