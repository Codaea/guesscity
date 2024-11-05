<template>
  <div>
    <UModal v-model="showResults" prevent-close>
      <p class="text-3xl text-center">Final Score</p>
      <p class="text-2xl text-center">{{ Math.round(score) }}</p>
      <UButton @click="reloadNuxtApp">Play Again</UButton>
    </UModal>
    <GameRound
      :key="currentRound"
      :video-id="videoId"
      :answer="answer!"
      @complete-round="completeRound"
    />
  </div>
</template>

<script setup lang="ts">
import GameRound from '~/components/GameRound.vue'
import videos from '~/data/videos2'
import type { Coordinates } from '~/types/Coordinates'

const score = ref(0)
const currentRound = ref(0)
const totalRounds = ref(2)
const showResults = ref(false)

const videoId = ref('')
const answer: Ref<Coordinates | null> = ref(null)

function initializeRound() {
  const video = videos[Math.floor(Math.random() * videos.length)] // TODO: make this psudo random
  videoId.value = video.videoId
  answer.value = { lat: video.coords[0], lng: video.coords[1] } as Coordinates
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
