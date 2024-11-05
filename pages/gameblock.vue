<template>
  <div>
  <UModal v-model="isGuessOpen">
    <UCard :ui="{body: { padding: '', }}">
      <template #header>
        <h1 class="text-3xl text-center">Guess Where!</h1>
      </template>
      <div class="h-[32rem] w-full">
        <GuessMap @update:guess="updateGuess" />
      </div>
      <template #footer>
        <UButton @click="isGuessOpen = false">Close</UButton>
        <UButton :disabled="guess == null" @click="submit" >Guess</UButton>
      </template>
    </UCard>
  </UModal> 
  
  <UButton
    class="fixed bottom-14 left-1/2 transform -translate-x-1/2 z-10"
    size="xl"
    @click="isGuessOpen = !isGuessOpen"
    >Guess</UButton
  >

  <VideoPlayer class="fixed top-0 left-0 -z-10 w-screen h-screen pointer-events-none select-none" :video-id="videoId" />

  </div>
</template>

<script setup lang="ts">
import type { Coordinates } from '~/types/Coordinates'
import { socket } from '~/components/socket';

const videoId: Ref<string> = useState('videoId');
const isGuessOpen = ref(false);

const guess = ref<Coordinates|null>(null);
const router = useRouter();

function updateGuess(value: Coordinates):void {
  guess.value = value;
}

function submit() {
  console.log(`Guessing: ${guess.value}`);
  socket.emit('guess', guess.value); 
  router.push('/answer/sent');
}



</script>
