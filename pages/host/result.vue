<template>
    <div>
        <h1>Results</h1>
        <p>Room Code: {{  }}</p>
        <div>
            <h1>Results here</h1>
        </div>
        <UButton size="xl" @click="next">Next Round</UButton>
    </div>
</template>

<script setup lang="ts">
import { socket } from '~/components/socket';
const scores = useState('scores');


function next() {
    console.log(scores)
    socket.emit('nextRound');
}
</script>
