<template>
  <div>
    <h1>Results</h1>
    <p>Room Code: {{}}</p>
    <div class="w-screen h-screen">
      <LMap
        class="w-screen h-screen"
        :zoom="zoom"
        :center="center"
        :use-global-leaflet="false"
      >
        <LMarker v-for="score in store.scores" :key="score.id" :lat-lng="score.guess">
          <LTooltip>{{ score.id}}'s Guess</LTooltip> <!-- TODO: add username to score type so this can get passed in -->
          <LIcon
            :icon-size="[25, 41]"
            :icon-anchor="[12, 41]"
            :shadow-size="[41, 41]"
            :icon-url="'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'"
            :shadow-url="'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'"
          />
        </LMarker>

        <LMarker :lat-lng="store.answer">
          <LTooltip>Answer</LTooltip>
          <LIcon
            :icon-size="[25, 41]"
            :icon-anchor="[12, 41]"
            :shadow-size="[41, 41]"
            :icon-url="'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'"
            :shadow-url="'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'"
          />
        </LMarker>

        <LTileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          layer-type="base"
          :max-zoom="20"
        />
      </LMap>
    </div>
    <UButton size="xl" @click="next">Next Round</UButton>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '#build/imports';

definePageMeta({
  middleware: ['forceconnection']
})

const store = useGameStore();


const zoom = ref(1);
const center = ref([0, 0]);
console.log(store.scores);

function next() {
  store.socket.emit('nextRound');
}
</script>
