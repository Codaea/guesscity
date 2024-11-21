<template>
  <div>
    <h1>Results</h1>
    <p>Room Code: {{}}</p>
    <div>
      <h1>Results here</h1>
    </div>
    <UButton size="xl" @click="next">Next Round</UButton>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '#build/imports';

const store = useGameStore();

const scores = store.scores;

function next() {
  console.log(scores);
  store.socket.emit('nextRound');
}
</script>
