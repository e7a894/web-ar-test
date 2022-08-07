<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue';
import * as THREE from 'three';

export interface Props {
  rotationX: number,
  rotationType: 'right' | 'left' | 'none',
  rotationSpeed: number,
  marker: string
}

const props = defineProps<Props>();
const canvas = ref<HTMLCanvasElement>();
let renderer: THREE.WebGLRenderer;

const getMaterial = computed(() => {
  const loader = new THREE.TextureLoader();
  const texture = loader.load(props.marker);
  texture.minFilter = THREE.LinearFilter;
  return new THREE.MeshStandardMaterial({ color: 0xFFFFFF, map: texture });
});

const x = computed(() => props.rotationX * -1);
const diffZ = computed(() => props.rotationType === 'right'
  ? props.rotationSpeed * -1
  : props.rotationType === 'left'
    ? props.rotationSpeed
    : 0
);

const animate = () => {
  requestAnimationFrame(animate);
  mesh.rotation.x = x.value;
  mesh.rotation.z += diffZ.value;
  renderer.render(scene, camera);
};

const camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
camera.position.set(0, 0, 70);

const light = new THREE.AmbientLight(0xFFFFFF, 2);
const scene = new THREE.Scene().add(light);
const geometry = new THREE.PlaneGeometry(50, 50, 50);
const material = getMaterial.value;
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

onMounted(() => {
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas.value });
  renderer.setSize(600, 600);
  renderer.setClearColor(0xFFFFFF, 1);
  animate();
});

watchEffect(() => { mesh.material = getMaterial.value; });

const reset = () => mesh.rotation.z = 0;

defineExpose({
  reset
});
</script>

<template>
  <canvas ref="canvas" />
</template>

<style scoped>
</style>