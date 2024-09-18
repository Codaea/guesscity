<template>
  <div class="w-full h-full">
    <LMap
      ref="map"
      :zoom="zoom"
      :center="center"
      :use-global-leaflet="false"
      @click="onMapClick"
      @ready="onMapReady"
    >
      <LMarker v-if="guess" :lat-lng="guess">
        <LTooltip>Your Guess</LTooltip>
        <LIcon
          :icon-size="[25, 41]"
          :icon-anchor="[12, 41]"
          :shadow-size="[41, 41]"
          :icon-url="'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'"
          :shadow-url="'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'"
        />
      </LMarker>
      <LMarker v-if="answer" :lat-lng="answer">
        <LTooltip>Answer</LTooltip>
        <LIcon
          :icon-size="[25, 41]"
          :icon-anchor="[12, 41]"
          :shadow-size="[41, 41]"
          :icon-url="'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'"
          :shadow-url="'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'"
        />
      </LMarker>
      <LPolyline v-if="answer && guess" :lat-lngs="[guess, answer]" :dash-array="'5,10'" />
      <LTileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        layer-type="base"
        :max-zoom="20"
      />
      <LControlAttribution position="bottomright" :prefix="attrib" />
    </LMap>
  </div>
</template>

<script setup lang="ts">
import type { Map, PointExpression } from 'leaflet'
import type { Coordinates } from '~/types/Coordinates'

const zoom = ref(1)
const center: Ref<PointExpression> = ref([0, 0])
const map = ref(null) // : Ref<null | Map>
const guess = ref<Coordinates | null>(null)
const attrib = `<a>&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a></a>`

const emit = defineEmits<{
  (event: 'update:guess', payload: Coordinates): void
}>()

const props = defineProps({
  answer: {
    type: Object as PropType<Coordinates>,
    default: undefined
  }
})

function onMapClick(e: L.LeafletMouseEvent) {
  if (props.answer) return // already answered, dont allow movement
  guess.value = { lat: e.latlng.lat, lng: e.latlng.lng }
  emit('update:guess', { lat: e.latlng.lat, lng: e.latlng.lng })
}

const onMapReady = () => {
  if (!map.value) return
  const mp: Map = map.value.leafletObject

  watch(
    () => props.answer,
    (newAnswer) => {
      mp.fitBounds([newAnswer, guess.value], { padding: [50, 50] })
    }
  )
}
</script>
