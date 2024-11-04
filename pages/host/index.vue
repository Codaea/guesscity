<template>
    <div>
        <h1>Host Online Game</h1>
        <p>Room Code: {{ roomcode }}</p>
        <UButton size="xl" @click="socket.emit('startGame', (roomcode))">Start Game</UButton>

        <div>
            <h1>Lobby Memebers in a list here</h1>
            <ul>
                <li v-for="player in players" :key="player.socketId">{{ player.username }}</li>
            </ul>
            </div>
    </div>
</template>

<script setup lang="ts">
import { socket } from '~/components/socket';
const router = useRouter();

const videoIdState = useState('videoId', () => '');
const roomcode = useState('room', () => '');
interface Player {
    socketId: string;
    username: string;
}

const players = ref<Player[]>([]);

socket.emit('room:new');

socket.on('room:new:success', (rmCode: string) => {
        console.log(rmCode);
        console.log('roomCode')
        roomcode.value = rmCode;
})

socket.on('player:joined', (socketId, username) => {
    console.log('player joined')
    players.value.push({socketId, username});
})

</script>