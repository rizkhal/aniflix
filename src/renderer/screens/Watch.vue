<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useEpisodeSource, useSetting } from "../stores";
import { storeToRefs } from "pinia";

// player
import Plyr from "plyr";
import HlsJS from "hls.js";
import "plyr/dist/plyr.css";

const route = useRoute();
const store = useEpisodeSource();
const newSource = ref<string | null>(null);
const { loading, sources } = storeToRefs(store);

const { animeId, episodeId } = route.params;

const video = ref();

onMounted(() => {
  store.fetch(episodeId);
});

const defaultOptions: Plyr.Options = {};

const loadPlayer = () => {
  const hls = new HlsJS();

  const allSource = sources.value.filter((i) => typeof i.quality === "number");

  const currentSource = allSource[0];
  const qualities = allSource.map((i) => i.quality);

  hls.loadSource(currentSource.url);

  hls.on(HlsJS.Events.MANIFEST_PARSED, function (event, data) {
    defaultOptions.quality = {
      loadSprite: false,
      default: currentSource.quality,
      options: qualities,
      forced: true,
      onChange: (e) => {
        const selected = allSource.filter((item) => item.quality === e)[0];
        newSource.value = selected.url;
      },
    };

    const player = new Plyr(video.value, defaultOptions);

    player.on("qualitychange", (event) => {
      const currentTime = player.currentTime;
      if (newSource.value) {
        hls.loadSource(newSource.value);
        hls.startLoad(currentTime);
      }
    });
  });

  hls.attachMedia(video.value);
};

watchEffect(() => {
  if (!loading.value && sources.value.length && HlsJS.isSupported()) {
    loadPlayer();
  }
});
</script>
<template>
  <div>
    <video ref="video" controls playsinline class="w-full h-[80vh]" />
  </div>
</template>
