<template>
    <div>
        <video ref="videoPlayerRef" ></video>
    </div>
</template>

<script setup lang="ts">
import videojs from 'video.js';
import 'videojs-youtube'

const videoPlayerRef = ref(null);


interface VideoPlayerOptions {
    autoplay: boolean;
    muted: boolean;
    controls: boolean;
    loop: boolean;
    sources: {
        src: string;
        type: string;
    }[];
    techOrder: string[];
}

const props = defineProps({
    options: {
        type: Object as PropType<VideoPlayerOptions>,
    }
})


onMounted(() => {
    if (videoPlayerRef.value) {
        const player = videojs(videoPlayerRef.value, props.options, () => {
            player.log('onPlayerReady', this);
        });
    }
});

onUnmounted(() => {
    if (videoPlayerRef.value) {
        videojs(videoPlayerRef.value).dispose();
    }
});
</script>

<style scoped>
/* @import 'video.js/dist/video-js.css'; this prevents autoplay???*/
</style>