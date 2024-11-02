<template>
    <div>
        <h1>Host Online Game</h1>
        <p>Room Code: {{ roomcode }}</p>
        <UButton size="xl" @click="socket.emit('startGame', (roomcode))">Start Game</UButton>

        <div>
            <h1>Lobby Memebers in a list here</h1>
            </div>
    </div>
</template>

<script setup lang="ts">
import { socket } from '~/components/socket';
const router = useRouter();

const videoIdState = useState('videoId', () => '');
const roomcode = useState('room', () => '');

socket.emit('newRoom');

socket.on('roomCode', (rmCode: string) => {
        console.log(rmCode);
        console.log('roomCode')
        roomcode.value = rmCode;
})

socket.on('watch', (videoId) => {
    console.log('late player, adding to round now')
    // update state
    videoIdState.value = videoId;
    router.push('/host/gameblock')
})
</script>