<template>
  <div class="w-screen h-screen">
    <h1 class="text-3xl text-center">__ Miles Off!</h1>
    <LMap
      class="w-screen h-screen"
      :zoom="zoom"
      :center="center"
      :use-global-leaflet="false"
    >
      <LMarker :lat-lng="store.guess">
        <LTooltip>Your Guess</LTooltip>
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

      <LPolyline :lat-lngs="[store.guess, store.answer]" :dash-array="'5,10'" />

      <LTileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        layer-type="base"
        :max-zoom="20"
      />
    </LMap>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['forceconnection']
})

const store = useGameStore();

const zoom = ref(1);
const center = ref([0, 0]);

</script>
