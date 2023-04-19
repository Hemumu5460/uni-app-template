import { createSSRApp } from "vue";
// pinia store
import pinia from "@/stores/index";
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia)
  return {
    app,
  };
}
