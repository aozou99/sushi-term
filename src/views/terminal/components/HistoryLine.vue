<template>
  <p class="history-line">{{ prefix }} <span v-html="content"></span></p>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class HistoryLine extends Vue {
  @Prop()
  public content!: string;
  @Prop()
  public prefix!: string;
}
</script>

<style>
p {
  margin-block-start: 0px;
  margin-block-end: 0px;
}
.roll {
  display: inline-block;
  animation: spin 1.5s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
