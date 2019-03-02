<template>
  <p class="history-line">{{ prefix }} {{ command }}</p>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class HistoryLine extends Vue {
  @Prop()
  public command!: string;
  @Prop()
  public prefix!: string;
}
</script>

<style>
p {
  margin-block-start: 0px;
  margin-block-end: 0px;
}
</style>
