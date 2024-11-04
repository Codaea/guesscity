import { socket } from "~/components/socket";

// contains central
export default defineNuxtPlugin(() => {
    const router = useRouter();
    const videoId = useState('videoId', () => '');
    const scores = useState('scores', () => ({}));
    const room = useState('room');

    const host = ref(false);

    // Global socket event handlers
    socket.on('watch', (newVideoId) => {
        videoId.value = newVideoId;
        if (host.value) {
            router.push('/host/gameblock');
            return;
        }
        router.push('/gameblock');
    });

    socket.on('scores', (newScores) => {
        scores.value = newScores;
        if (host.value) {
            router.push('/host/result');
            return;
        }
        router.push('/answer/result');  
    });

    socket.on('room:new:success', (roomCode) => {
        room.value = roomCode;
        host.value = true;
    });

    socket.on('room:join:success', (roomCode) => {
        room.value = roomCode;
        router.push('/lobby');
    });
})