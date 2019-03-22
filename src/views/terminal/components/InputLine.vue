<template>
  <p ref="line">
    <span ref="prefix">{{ prefix }}</span
    ><input
      type="text"
      v-model="command"
      @keyup="onKeyUp"
      ref="input"
      :style="{ width: width() }"
    />
  </p>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import { createLocalStorage } from "localstorage-ponyfill";
const localStorage = createLocalStorage();

@Component
export default class InputLine extends Vue {
  public command: string = "";
  public prefix: string = "$ ";
  private lineW: number = 0;
  private prefixW: number = 0;
  private history: string[] = [];
  private histIdx: number = 0;

  /**
   * @lifecycle
   */
  public mounted() {
    // コマンド履歴をLocalstrageから取得
    const localHistroy = localStorage.getItem("history");
    if (localHistroy !== null) {
      this.history = JSON.parse(localHistroy) as string[];
      this.histIdx = this.history.length;
    }
    // 入力フォームにフォーカス設定
    this.handleFocusInput();
    // 入力フォームのwidth調整用
    this.lineW = window.innerWidth;
    this.prefixW = this.getHTMLElement("prefix").offsetWidth;
    // イベント設定
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("keydown", this.handleFocusInput);
  }

  /**
   * @lifecycle
   */
  public beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("keydown", this.handleFocusInput);
  }

  public width() {
    return `${this.lineW - this.prefixW - 20}px`;
  }

  private handleResize() {
    this.lineW = window.innerWidth;
  }

  private handleFocusInput(event?: KeyboardEvent) {
    if (event) {
      if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) {
        return;
      }
    }
    this.getHTMLElement("input").focus();
  }

  public getHTMLElement(key: string): HTMLElement {
    return this.$refs[key] as HTMLElement;
  }

  @Emit()
  public enter(command: string, prefix: string) {}

  public onKeyUp(event: KeyboardEvent) {
    switch (event.key.toLowerCase()) {
      case "enter":
        // イベント通知
        this.enter(this.command, this.prefix);
        // コマンド履歴保存
        this.history.push(this.command);
        localStorage.setItem("history", JSON.stringify(this.history));
        // コマンドリセット
        this.command = "";
        this.histIdx = this.history.length;
        break;
      case "arrowup":
        if (this.histIdx > 0) {
          this.histIdx--;
          this.command = this.history[this.histIdx];
        }
        break;
      case "arrowdown":
        if (this.histIdx < this.history.length) {
          this.histIdx++;
          this.command = this.history[this.histIdx];
        }
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
