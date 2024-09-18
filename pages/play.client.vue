<template>
  <div>
    <UModal v-model="showResults" prevent-close>
      Final Score: {{ score }}
    </UModal>
    <Round :key="currentRound" @complete-round="completeRound" :video-id="videoId" :answer="answer" />
  </div>
</template>

<script setup lang="ts">

const score = ref(0);
const currentRound = ref(0);
const totalRounds = ref(2);
const showResults = ref(false);

const videoId = ref('');
const answer = ref();

import videos from '~/data/videos';

function initializeRound() {
  const video = videos[Math.floor(Math.random() * videos.length)]; // TODO: make this psudo random
  videoId.value = video.src;
  answer.value = [video.lat, video.lng];
}

function completeRound(roundScore: number) {
  if (currentRound.value < totalRounds.value) {
    score.value += roundScore;
    currentRound.value++;
    initializeRound();
  } else {
    // Handle end of game
    showResults.value = true;
  }
}

initializeRound();
</script>