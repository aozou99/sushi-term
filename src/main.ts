import Vue from "vue";
import Terminal from "./views/terminal/Terminal.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(Terminal)
}).$mount("#app");
