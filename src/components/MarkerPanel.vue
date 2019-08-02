<template>
  <canvas ref="canvas" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator';
import * as THREE from 'three';

@Component
export default class MarkerPanel extends Vue {
  @Prop({ default: 0 }) rotationX!: number;
  @Prop({ default: 0 }) rotationZ!: number;
  @Prop({ default: 'none' }) rotationType!: 'right' | 'left' | 'none'
  @Prop({ default: 0.01 }) rotationSpeed!: number;
  @Prop({ default: '/images/hiro.png' }) marker!: string;

  canvas!: HTMLCanvasElement;
  readonly scene: THREE.Scene = new THREE.Scene();
  renderer!: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  light: THREE.AmbientLight;
  geometry: THREE.PlaneGeometry;
  material: THREE.MeshStandardMaterial;
  mesh: THREE.Mesh;

  constructor() {
    super();

    this.camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
    this.camera.position.set(0, 0, 70);

    this.light = new THREE.AmbientLight(0xFFFFFF, 2);
    this.scene.add(this.light);

    this.geometry = new THREE.PlaneGeometry(50, 50, 50);
    this.material = this.getMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  get x(): number {
    return this.rotationX * -1;
  }

  get diffZ(): number {
    return this.rotationType === 'right' ? (this.rotationSpeed * -1) : this.rotationType === 'left' ? this.rotationSpeed : 0;
  }

  mounted() {
    this.canvas = this.$refs.canvas as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.canvas });
    this.renderer.setSize(600, 600);
    this.renderer.setClearColor(0xFFFFFF, 1);
    this.animate();
  }

  public reset() {
    this.mesh.rotation.z = 0;
  }

  @Watch('marker')
  private onMarkerChanged() {
    this.mesh.material = this.getMaterial();
  }

  private getMaterial() {
    const loader: THREE.TextureLoader = new THREE.TextureLoader();
    const texture = loader.load(this.marker);
    texture.minFilter = THREE.LinearFilter;
    return new THREE.MeshStandardMaterial({ color: 0xFFFFFF, map: texture });
  }

  private animate() {
    requestAnimationFrame(this.animate);
    this.mesh.rotation.x = this.x;
    this.mesh.rotation.z += this.diffZ;
    this.renderer.render(this.scene, this.camera);
  }
}
</script>
