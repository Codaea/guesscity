<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="space-y-4">
      <p class="text-7xl">{{ randomSaying }}</p>
      <p class="text-xl text-center">Waiting for round to end...</p>
      <!-- LOADING SVG HERE -->
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['forceconnection']
})

const sayings = [
  'Best guesser ever?',
  "You didn't cheat did you?",
  'Good Guess!',
];

const randomSaying = sayings[Math.floor(Math.random() * sayings.length)];
</script>
