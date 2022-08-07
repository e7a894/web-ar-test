<script setup lang="ts">
import { reactive, Ref, ref, watch } from 'vue';
import MarkerPanel, { Props as MarkerPanelProps } from './components/MarkerPanel.vue';

const markerPanel = ref<InstanceType<typeof MarkerPanel>>();

let isRotated = ref(false);
let direction: Ref<'left' | 'right'> = ref('left');
let marker = ref('./images/hiro.png');
let customFileUrl = ref('');

const vbMarkerPanel = reactive<MarkerPanelProps>(
  {
    rotationX: 1,
    rotationType: isRotated.value ? direction.value : 'none',
    rotationSpeed: 0.01,
    marker: marker.value
  }
);

watch([isRotated, direction], () => {
  vbMarkerPanel.rotationType = isRotated.value ? direction.value : 'none';
});

watch(marker, () => setMarker());

const selectFile = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target?.files?.[0]) {
    customFileUrl.value = window.URL.createObjectURL(target.files[0]);
    setMarker();
  }
}

const setMarker = () => {
  vbMarkerPanel.marker = marker.value === 'custom' ? customFileUrl.value : marker.value;
};

const clickReset = () => {
  isRotated.value = false;
  markerPanel.value?.reset();
};
</script>

<template>
  <h1>WebAR TEST</h1>
  <div class="container">
    <div class="parameters">
      <div>
        <h3>Incline</h3>
        <input type="range" v-model.number="vbMarkerPanel.rotationX" max="1" min="0" step="0.01" />
      </div>
      <div>
        <h3>Rotate</h3>
        <div>
          <label><input type="checkbox" v-model="isRotated" /></label>
          <button @click="clickReset">Reset</button>
        </div>
        <div>
          <label><input type="radio" v-model="direction" value="left" />Left</label>
          <label><input type="radio" v-model="direction" value="right" />Right</label>
        </div>
        <label><input type="range" v-model.number="vbMarkerPanel.rotationSpeed" max="0.1" min="0.01"
            step="0.001" /></label>
      </div>
      <div>
        <h3>Marker</h3>
        <div>
          <label><input type="radio" v-model="marker" value="./images/hiro.png" />Hiro</label>
          <label><input type="radio" v-model="marker" value="./images/kanji.png" />Kanji</label>
          <label><input type="radio" v-model="marker" value="custom" />Custom (.png, .jpg)</label>
        </div>
        <label><input type="file" @change="selectFile" /></label>
      </div>
    </div>
    <div class="marker">
      <marker-panel ref="markerPanel" v-bind="vbMarkerPanel" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.parameters {
  flex: 1;
}

.marker {
  flex: 1;
}
</style>