<template>
  <div>
    <UModal v-model="showResults" prevent-close>
      Final Score: {{ score }}
    </UModal>
    <Round :key="currentRound" @complete-round="completeRound" :video-src="videoSrc" />
  </div>
</template>

<script setup lang="ts">

const score = ref(0);
const currentRound = ref(0);
const totalRounds = ref(2);
const showResults = ref(false);

const videoSrc = ref('');

const videos = ["https://www.youtube.com/embed/6xlPJiNpCVw", "https://www.youtube.com/embed/F-9KWQByeU0"]

function initializeRound() {
  videoSrc.value = videos[Math.floor(Math.random() * videos.length)];


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