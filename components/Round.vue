<template>
  <UModal v-model="isGuessOpen">
    <UCard>
      <template #header>
        <h1 class="text-3xl">Guess the city!</h1>
      </template>
      <div class="w-[29rem] h-[20rem]">
        <Map :answer="answer" @update:guess="guess" />
      </div>
      <template #footer>
        <UButton @click="isGuessOpen = false">Close</UButton>
        <UButton v-if="!submitted" @click="submit">Select</UButton>
        <UButton v-if="submitted" @click="emit('completeRound', score)">Next Round</UButton>
      </template>
    </UCard>
  </UModal>
  <UButton
    class="fixed bottom-14 left-1/2 transform -translate-x-1/2 z-10"
    size="xl"
    @click="isGuessOpen = !isGuessOpen"
    >Guess</UButton
  >
  <BackgroundVideoPlayer
    class="fixed top-0 left-0 -z-10 w-screen h-screen pointer-events-none select-none"
    :video-id="props.videoId"
  />
</template>

<script setup lang="ts">
import type { LatLngExpression } from 'leaflet'

const guess = ref(null)
const isGuessOpen = ref(false)
const answer = ref<LatLngExpression | null>(null) // gets changed to the correct answer on submit
const score = ref(0)
const submitted = ref(false)

const props = defineProps({
  videoId: {
    type: String,
    required: true
  },
  answer: {
    type: Object as PropType<LatLngExpression>,
    required: true
  }
})

const emit = defineEmits(['completeRound'])

function submit() {
  // after submitting, show the correct answer (passed from parent)
  answer.value = props.answer
  // TODO: make score calculation w algo
  score.value = 100
  // change button to move on to next round
  submitted.value = true
}
</script>
