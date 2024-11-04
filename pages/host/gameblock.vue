<template>
    <div>
        <h1>Host Game view</h1>
        <p>Room Code: {{ room }}</p>
        <div>
            <VideoPlayer class="fixed top-0 left-0 -z-10 w-screen h-screen pointer-events-none select-none" :video-id="videoId" />
        </div>
    </div>
</template>

<script setup lang="ts">

const videoId = useState('videoId');
const room = useState('room');
</script>