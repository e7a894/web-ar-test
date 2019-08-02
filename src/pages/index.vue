<template>
  <v-app>
    <v-content>
      <v-app-bar>
        <v-toolbar-title>WebAR TEST</v-toolbar-title>
      </v-app-bar>
      <v-container>
        <v-layout wrap>
          <v-flex md6>
            <v-container>
              <h3 class="headline">
                Incline
              </h3>
              <v-slider v-model="rotationX" max="1" min="0" step="0.01" />
            </v-container>
            <v-container>
              <h3 class="headline">
                Rotate
              </h3>
              <v-layout align-center>
                <v-flex xs2>
                  <v-switch v-model="isRotated" />
                </v-flex>
                <v-flex xs2>
                  <v-btn @click="clickReset">
                    Reset
                  </v-btn>
                </v-flex>
                <v-flex xs 3>
                  <v-btn-toggle v-model="direction" mandatory>
                    <v-btn value="left">
                      <v-icon>mdi-rotate-left</v-icon>
                    </v-btn>
                    <v-btn value="right">
                      <v-icon>mdi-rotate-right</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-flex>
                <v-flex xs5 mt-5>
                  <v-slider
                    v-model="rotationSpeed"
                    max="0.1"
                    min="0.01"
                    step="0.001"
                    prepend-icon="mdi-speedometer-slow"
                    append-icon="mdi-speedometer"
                  />
                </v-flex>
              </v-layout>
            </v-container>
            <v-container>
              <h3 class="headline">
                Marker
              </h3>
              <v-radio-group v-model="marker" row>
                <v-radio label="Hiro" value="/images/hiro.png" />
                <v-radio label="Kanji" value="/images/kanji.png" />
                <v-radio label="Custom (.jpg, .png)" :value="radioValue" />
              </v-radio-group>
              <v-file-input label="Custom Marker" @change="selectFile" />
            </v-container>
          </v-flex>
          <v-flex md6 text-center>
            <marker-panel
              ref="marker"
              :rotation-x="+rotationX"
              :rotation-z="+rotationZ"
              :rotation-type="rotationType"
              :rotation-speed="+rotationSpeed"
              :marker="marker + ''"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import MarkerPanel from '~/components/MarkerPanel.vue';

interface HTMLElementEvent<T extends HTMLElement> extends Event { target: T;}

@Component({ components: { MarkerPanel } })
export default class extends Vue {
  rotationX: number = 0;
  rotationZ: number = 0;
  isRotated: boolean = false;
  direction: 'right' | 'left' = 'left';
  rotationSpeed: number = 0.01;
  marker: string = '/images/hiro.png'
  customFileUrl: string = '';

  get rotationType(): 'right' | 'left' | 'none' {
    return this.isRotated ? this.direction : 'none';
  }

  get radioValue() {
    return this.customFileUrl;
  }

  clickReset() {
    this.isRotated = false;
    (this.$refs.marker as MarkerPanel).reset();
  }

  selectFile(file: File) {
    this.customFileUrl = file ? window.URL.createObjectURL(file) : '';
    this.marker = this.customFileUrl;
  }
}
</script>
