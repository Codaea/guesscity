<template>
  <UModal v-model="isGuessOpen">
    <UCard :ui="{ body: { padding: '' } }">
      <template #header>
        <h1 class="text-3xl text-center">{{ headerText }}</h1>
      </template>
      <div class="h-[32rem] w-full">
        <GuessMap :answer="localAnswer!" @update:guess="updateGuess" />
      </div>
      <template #footer>
        <UButton @click="isGuessOpen = false">Close</UButton>
        <UButton v-if="!submitted" :disabled="guess == null" @click="submit"
          >Select</UButton
        >
        <UButton v-if="submitted" @click="emit('completeRound', score)"
          >Next Round</UButton
        >
      </template>
    </UCard>
  </UModal>
  <UButton
    class="fixed bottom-14 left-1/2 transform -translate-x-1/2 z-10"
    size="xl"
    @click="isGuessOpen = !isGuessOpen"
    >Guess</UButton
  >
  <VideoPlayer
    class="fixed top-0 left-0 -z-10 w-screen h-screen pointer-events-none select-none"
    :video-id="props.videoId"
  />
</template>

<script setup lang="ts">
import type { Coordinates } from '~/types/Coordinates';

const headerText = ref('Guess the Location');
const guess = ref<Coordinates>();
const isGuessOpen = ref(false);
const localAnswer = ref<Coordinates | null>(null); // gets changed to the correct answer on submit
const score = ref(0);
const submitted = ref(false);

const props = defineProps({
  videoId: {
    type: String,
    required: true,
  },
  answer: {
    type: Object as PropType<Coordinates>,
    required: true,
  },
});

const emit = defineEmits(['completeRound']);

function submit() {
  // after submitting, show the correct answer (passed from parent)
  localAnswer.value = props.answer;
  // TODO: make score calculation w algo
  // scoring is based off of distance from correct answer. perfect is 1000, furthest is 0.
  const maxDistance = 20000; // Maximum possible distance on Earth in kilometers
  console.log(guess.value);
  const distance = calculateDistance(guess.value!, props.answer);
  score.value = Math.max(0, 1000 - (distance / maxDistance) * 1000);

  if (distance < 100) {
    headerText.value = `You were ${Math.round(distance)} km away! Perfect!`;
  } else if (distance < 500) {
    headerText.value = `You were ${Math.round(distance)} km away! Great job!`;
  } else if (distance < 1000) {
    headerText.value = `You were ${Math.round(distance)} km away! Good job!`;
  } else {
    headerText.value = `You were ${Math.round(distance)} km away!`;
  }
  // change button to move on to next round
  submitted.value = true;
}

function updateGuess(value: Coordinates) {
  guess.value = value;
}

function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  const R = 6371; // Radius of the Earth in kilometers

  const dLat = toRadians(coord2.lat - coord1.lat);
  const dLon = toRadians(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.lat)) *
      Math.cos(toRadians(coord2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
}
</script>
