<template>
  <div class="wrapper">
    <div class="frame-container">
      <iframe
        frameborder="0"
        :src="`https://www.youtube.com/embed/${props.videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&autohide=1&modestbranding=1`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  videoId: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.frame-container {
  position: relative;
  padding-bottom: 56.25%;
  /* 16:9 */
  padding-top: 25px;
  width: 300%;
  /* enlarge beyond browser width */
  left: -100%;
  /* center */
}

.frame-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.wrapper {
  overflow: hidden;
  max-width: 100%;
}
</style>
