<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { RouteParams, useRoute } from "vue-router";
import { useEpisodeSource } from "../stores";
import { storeToRefs } from "pinia";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import hlsjs from "hls.js";

const route = useRoute();
const store = useEpisodeSource();
const { loading, data, sources } = storeToRefs(store);

const { animeId, episodeId } = route.params;

const video = ref();
const hls = new hlsjs();

onMounted(() => {
  store.fetch(episodeId);
});

watchEffect(() => {
  const defaultOptions = {};

  if (!loading.value && sources.value?.length && hlsjs.isSupported()) {
    const ee = sources.value.filter(i => i.quality === 360)[0];
    hls.loadSource(ee.url);

    hls.on(hlsjs.Events.MANIFEST_PARSED, function (event, data) {
      // Add new qualities to option
      defaultOptions.quality = {
        default: ee.quality,
        options: [360, 480, 720, 1080],
        // this ensures Plyr to use Hls to update quality level
        forced: true,
        onChange: (e) => {
          const anu = sources.value.filter((item) => item.quality === e)[0];
          hls.loadSource(anu.url);
        },
      };

      // Initialize here
      const player = new Plyr(video.value, defaultOptions);
    });

    hls.attachMedia(video.value);
  } else {
    console.log("unsuported!");
  }
});
</script>
<template>
  <div>
    <video ref="video" controls playsinline class="w-full" />
  </div>
</template>
