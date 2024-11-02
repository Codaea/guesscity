<template>
    <div>
        <h1>Host Game view</h1>
        <p>Room Code: {{ room }}</p>
        <div>
            <VideoPlayer class="fixed top-0 left-0 -z-10 w-screen h-screen pointer-events-none select-none" :video-id="videoId" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { socket } from '~/components/socket';

const videoId = useState('videoId');
const room = useState('room');
const scores = useState('scores');
const router = useRouter();


// TODO: add a timer?
socket.on('scores', (score) => {
    console.log(score);
    scores.value = score;
    router.push('/host/result');
    // move to next phase
}) // move to next phase when scores are recived


</script>