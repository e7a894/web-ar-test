<script setup lang="ts">
import { reactive, Ref, ref, watch } from 'vue';
import MarkerPanel, { Props as MarkerPanelProps } from './components/MarkerPanel.vue';

const markerPanel = ref<InstanceType<typeof MarkerPanel>>();

let isRotated = ref(false);
let direction: Ref<'left' | 'right'> = ref('left');
let marker = ref('/images/hiro.png');
let customFileUrl = ref('');

const vbMarkerPanel = reactive<MarkerPanelProps>(
  {
    rotationX: 0,
    rotationType: isRotated.value ? direction.value : 'none',
    rotationSpeed: 0.01,
    marker: marker.value
  }
);

watch([isRotated, direction], () => {
  vbMarkerPanel.rotationType = isRotated.value ? direction.value : 'none';
});

watch(marker, () => {
  vbMarkerPanel.marker = marker.value === 'custom' ? customFileUrl.value : marker.value;
});

const selectFile = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target && target.files) {
    marker.value = window.URL.createObjectURL(target.files[0]);
  }
}

const clickReset = () => {
  isRotated.value = false;
  markerPanel.value?.reset();
};
</script>

<template>
  <div>WebAR TEST</div>
  <h3>Incline</h3>
  <input type="range" v-model.number="vbMarkerPanel.rotationX" max="1" min="0" step="0.01" />
  <h3>Rotate</h3>
  <input type="checkbox" v-model="isRotated" />
  <button @click="clickReset">Reset</button>
  <input type="radio" v-model="direction" value="left" />
  <input type="radio" v-model="direction" value="right" />
  <input type="range" v-model.number="vbMarkerPanel.rotationSpeed" max="0.1" min="0.01" step="0.001" />
  <h3>Marker</h3>
  <input type="radio" v-model="marker" value="/images/hiro.png" />
  <input type="radio" v-model="marker" value="/images/kanji.png" />
  <input type="radio" v-model="marker" value="custom" />
  <input type="file" @change="selectFile" />
  <marker-panel ref="markerPanel" v-bind="vbMarkerPanel" />
</template>

<style scoped>
</style>