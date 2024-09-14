<template>
        <div class="w-full h-full">
            <LMap @click="onMapClick" ref="map" :zoom="zoom" :center="[47.21322, -1.559482]"
                :use-global-leaflet="false">
                <LMarker v-if="guess" :lat-lng="guess" />
                <LMarker v-if="answer" :lat-lng="answer" />
                <LPolyline v-if="answer && guess" :lat-lngs="[guess, answer]" />
                <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                    layer-type="base" name="OpenStreetMap" />
            </LMap>
        </div>
</template>

<script setup lang="ts">
import type { LatLngExpression } from 'leaflet'
const zoom = ref(6)
const map = ref(null)

const emit = defineEmits(['update:guess'])

const guess = ref<LatLngExpression | undefined>(undefined)
const props = defineProps({
    answer: {
        type: Object as PropType<LatLngExpression>,
        default: undefined
    }
})

function onMapClick(e: L.LeafletMouseEvent) {
    if (props.answer) return // already answered, dont allow movement
    guess.value = [e.latlng.lat, e.latlng.lng] // update 
    emit('update:guess', [e.latlng.lat, e.latlng.lng])
}

</script>
