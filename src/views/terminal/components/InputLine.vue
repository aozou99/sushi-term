<template>
  <p ref="line">
    <span ref="prefix">{{prefix}}</span><input type="text" v-model="command" @keyup="onKeyUp" ref="input" :style="{width: width()}"/>
  </p>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";

@Component
export default class InputLine extends Vue {
  public command: string = "";
  public prefix: string = "$ ";
  private lineW: number = 0;
  private prefixW: number = 0;
  private inputW: number = 0;

  public mounted() {
    this.getHTMLElement("input").focus();
    this.lineW = this.getHTMLElement("line").offsetWidth;
    this.prefixW = this.getHTMLElement("prefix").offsetWidth;
    this.inputW = this.getHTMLElement("input").offsetWidth;
  }

  public width() {
    return `${this.lineW - this.prefixW - 2}px`;
  }

  public getHTMLElement(key: string): HTMLElement {
    return this.$refs[key] as HTMLElement;
  }

  @Emit()
  public enter(command: string, prefix: string) {}

  public onKeyUp(event: KeyboardEvent) {
    switch (event.key.toLowerCase()) {
      case "enter":
        this.enter(this.command, this.prefix);
        this.command = "";
        break;

      default:
        break;
    }
  }
}
</script>
<style scoped>
input {
    background-color: black;
    border-width: 0px;
    padding: 0;
    font: inherit;
    color: inherit;
    outline: 0;
}
</style>
