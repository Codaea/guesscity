<template>
  <div class="flex justify-center items-center h-screen">
    <div>
      <p class="text-6xl text-center">Your In!</p>
      <p>Waiting for host to start game...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['forceconnection']
})

</script>
