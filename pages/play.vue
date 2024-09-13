<template>
  <div class="fixed bottom-14 left-1/2 transform -translate-x-1/2  z-10">
    <div v-if="selected" class="w-[50vw] h-[50vh]">
      <GuessMap />
    </div>
    <div class="flex flex-col items-center mt-4">
      <UButton size="xl" @click="selected = !selected">Guess</UButton>
    </div>
  </div>
  <BackgroundVideoPlayer class="fixed top-0 left-0 -z-10 w-screen h-screen pointer-events-none select-none"
    :options="videoOptions" />
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(false)

const videoOptions = {
  autoplay: true,
  muted: true,
  controls: false,
  loop: true,
  sources: [{
    src: 'https://www.youtube.com/embed/M3N9uOdoQjk',
    type: 'video/youtube'
  }],
  techOrder: ['youtube']
}


</script>