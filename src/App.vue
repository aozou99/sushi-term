<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <p>{{ greetText }}</p>
    <p>挨拶した回数: {{ count }}回</p>
    <p v-if="isRegulars">いつもありがとうございます</p>
    <p>
      <Mybutton
        class="my-button"
        :greet="greetText"
        @clicked="onMyButtonClicked"
        >挨拶する</Mybutton
      >
    </p>
    <p>
      <ResetButton initialValue="Hello" v-model="greetText"></ResetButton>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import HelloWorld from "./views/HelloWorld.vue";
import Mybutton from "./components/Mybutton.vue";
import ResetButton from "./components/ResetButton.vue";

@Component({
  components: {
    HelloWorld,
    Mybutton,
    ResetButton
  }
})
export default class App extends Vue {
  public greetText: string = "Hello";
  private count: number = 0;

  public get isRegulars(): boolean {
    return this.count > 5;
  }

  @Watch("count")
  public countChanged() {
    if (this.count === 5) {
      alert("常連になりました");
    }
  }

  public onMyButtonClicked(count: number) {
    this.count = count;
    this.greetText = "こんにちは";
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
