<template>
  <div>
    <UModal v-model="showResults" prevent-close> Final Score: {{ score }} </UModal>
    <GameRound
      :key="currentRound"
      :video-id="videoId"
      :answer="answer!"
      @complete-round="completeRound"
    />
  </div>
</template>

<script setup lang="ts">
import GameRound from '~/components/GameRound.vue';
import videos from '~/data/videos'
import type { Coordinates } from '~/types/Coordinates'

const score = ref(0)
const currentRound = ref(0)
const totalRounds = ref(2)
const showResults = ref(false)

const videoId = ref('')
const answer: Ref<Coordinates | null> = ref(null)

function initializeRound() {
  const video = videos[Math.floor(Math.random() * videos.length)] // TODO: make this psudo random
  videoId.value = video.src
  answer.value = { lat: video.lat, lng: video.lng }
}

function completeRound(roundScore: number) {
  if (currentRound.value < totalRounds.value) {
    score.value += roundScore
    currentRound.value++
    initializeRound()
  } else {
    // Handle end of game
    showResults.value = true
  }
}

initializeRound()
</script>
