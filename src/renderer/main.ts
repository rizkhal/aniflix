import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.scss";
import App from "./App.vue";
import router from "./routes";
import registerLayout from "./layouts/registerLayout";

import VueVideoPlayer from "@videojs-player/vue";
import "video.js/dist/video-js.css";

import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
const store = createPinia();

app.use(router);
app.use(store);
app.use(VueVideoPlayer);
app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions);

app.mount("#app");

registerLayout(app);
