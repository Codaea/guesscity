<template>
        <div class="w-full h-full">
            <LMap @click="onMapClick" ref="map" :zoom="zoom" :center="[47.21322, -1.559482]"
                :use-global-leaflet="false">
                <LMarker v-if="guess" :lat-lng="guess" />
                <LMarker v-if="answer" :lat-lng="answer" />
                <LPolyline v-if="answer && guess" :lat-lngs="[guess, answer]" />
                <LTileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" layer-type="base" :max-zoom="20" />
                <LControlAttribution position="bottomright" :prefix="attrib" />
            </LMap>
        </div>
</template>

<script setup lang="ts">
import type { LatLngExpression } from 'leaflet'
const zoom = ref(6)
const map = ref(null)

const attrib = `<a>&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a></a>`

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
