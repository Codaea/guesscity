<template>
    <div>
        <div class="w-screen h-32 bg-gray-500 mt-5">
            <div>
                <p class="text-7xl text-center">Guess The Location!</p>
            </div>
            <div>
                <p class="text-3xl text-center">Room Code: {{ room }}</p>
            </div>
        </div>
        <div>
            <VideoPlayer class="fixed top-0 left-0 -z-10 w-screen h-screen pointer-events-none select-none" :video-id="videoId" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGameStore } from '#build/imports';

const store = useGameStore();

const videoId = store.videoId;
console.log(videoId);
const room = store.room;
</script>