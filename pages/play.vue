<template>
  <div class="flex flex-col min-h-screen p-8">
    <h1 class="text-6xl mb-12 text-center">Play Now</h1>
    <div class="flex flex-wrap justify-center items-center flex-grow">
      <!-- Bottom two boxes -->
      <div class="flex justify-center gap-8 w-full mb-8">
        <NuxtLink to="/online/host" class="w-1/3">
          <div class="p-12 bg-gray-700 rounded-lg shadow hover:shadow-md cursor-pointer transition-transform duration-200 hover:-translate-y-2">
            <p class="text-center font-medium">Host Online Game</p>
          </div>
        </NuxtLink>
        <NuxtLink to="/online/join" class="w-1/3">
          <div class="p-12 bg-gray-700 rounded-lg shadow hover:shadow-md cursor-pointer transition-transform duration-200 hover:-translate-y-2">
            <p class="text-center font-medium">Join Online Game</p>
          </div>
        </NuxtLink>
      </div>
      <!-- Top box -->
      <NuxtLink to="/offline" class="w-1/3">
        <div class="p-12 bg-gray-700 rounded-lg shadow hover:shadow-md cursor-pointer transition-transform duration-200 hover:-translate-y-2">
          <p class="text-center font-medium">Play Offline</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '#build/imports';
// initalize gameState (for socket listeners)
useGameStore().init(); // TODO: find a better way to init, from the pinia store instead of here
</script>