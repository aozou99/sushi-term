<template>
  <button @click="onClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class Mybutton extends Vue {
  private count: number = 0;
  @Prop()
  public greet?: string;

  @Emit()
  public clicked(count: number) {}

  public onClick() {
    this.count++;
    this.clicked(this.count);
  }
}
</script>
