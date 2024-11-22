<template>
  <div>
    <UModal v-model="isGuessOpen">
      <UCard :ui="{ body: { padding: '' } }">
        <template #header>
          <h1 class="text-3xl text-center">Guess!</h1>
        </template>
        <div class="h-[60vh] max-h-[32rem] w-full overflow-auto">
          <GuessMap @update:guess="updateGuess" />
        </div>
        <template #footer>
          <div class="flex flex-row justify-between items-center w-full">
            <UButton @click="isGuessOpen = false">Close</UButton>
            <UButton :disabled="guess == null" @click="submit">Submit</UButton>
          </div>
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
      :video-id="store.videoId"
    />
  </div>
</template>

<script setup lang="ts">
import type { Coordinates } from '~/types/Coordinates';
import { useGameStore } from '#build/imports';

definePageMeta({
  middleware: ['forceconnection']
})

const store = useGameStore();

const isGuessOpen = ref(false); // for v-model

const guess = ref<Coordinates | null>(null);
const router = useRouter();

function updateGuess(value: Coordinates): void {
  guess.value = value;
}

function submit() {
  if (guess.value) {
    store.guess = guess.value;
    console.log(`Guessing: ${guess.value}`);
    store.socket.emit('guess', guess.value);
    router.push('/online/answer/sent');
  }
}
</script>
