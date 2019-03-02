<template>
  <div id="app">
    <HistoryLine
      v-for="(line, index) in history"
      :key="index"
      v-bind="line"
    ></HistoryLine>
    <InputLine @enter="exec" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import InputLine from "./components/InputLine.vue";
import HistoryLine from "./components/HistoryLine.vue";
@Component({
  components: {
    InputLine,
    HistoryLine
  }
})
export default class Terminal extends Vue {
  private history: Array<object> = [];

  public exec(command: string, prefix: string) {
    this.history.push({ command, prefix });
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: rgb(50, 255, 40);
  padding: 0px 1.5px;
}
body {
  background-color: black;
}
</style>
