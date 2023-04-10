import { createApp } from "vue";
import { createPinia } from "pinia";

import "./style.scss";

import App from "./App.vue";
import router from "./routes";
import layout from "./layouts/registerLayout";
import component from "./components/registerComponent";

import VueVideoPlayer from "@videojs-player/vue";
import "video.js/dist/video-js.css";

import { plugin as VueTippy } from "vue-tippy";
import "tippy.js/dist/tippy.css";

import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
const store = createPinia();

app.use(router);
app.use(store);

app.use(VueVideoPlayer);

// custom layout & component
app.use(layout);
app.use(component);

app.use(VueTippy, {
  component: "v-tippy",
});

app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions);

app.mount("#app");
