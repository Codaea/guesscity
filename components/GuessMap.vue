<template>
    <div style="width:100%; height:100%;">
    <LMap ref="map" class="w-screen h-screen" :zoom="zoom" :center="[47.21322, -1.559482]" :use-global-leaflet="false">
        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
            layer-type="base" name="OpenStreetMap" />
    </LMap>
</div>
</template>

<script setup lang="ts">
const zoom = ref(6)

const map = ref(null)

interface Guess {
    lat: number;
    lng: number;
}

defineProps({
    guess : {
        type: Object as PropType<Guess>,
    }
})
</script>