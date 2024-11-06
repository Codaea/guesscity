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
import { useGameState } from '~/compostables/useGameState';
import { getSocket } from '~/components/socket';

const gameState = useGameState();
const socket = getSocket();

const scores = gameState.scores;

function next() {
    console.log(scores)
    socket.emit('nextRound');
}
</script>
