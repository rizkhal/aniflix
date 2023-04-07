<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, reactive, onMounted, watch } from "vue";
import { useAnimeInfo, useServer, useWatchAnime } from "../stores";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import type { VideoStreamingSource, AvailableAnimeServer } from "../typings";
import VideoLoading from "../components/skeleton/VideoLoadingSkeleton.vue";
import VideoDetailLoadingSkeleton from "../components/skeleton/VideoDetailLoadingSkeleton.vue";

const servers = ref<AvailableAnimeServer[]>([]);
const infoAnimeStore = useAnimeInfo();
const watchAnimeStore = useWatchAnime();
const route: RouteLocationNormalizedLoaded = useRoute();

const { episodeId } = route.params;
const { info, loading: infoLoading } = storeToRefs(infoAnimeStore);
const { videosMP4, loading, filteredAvaillableServer } =
  storeToRefs(watchAnimeStore);

const sources: VideoStreamingSource = reactive({
  src: undefined,
  type: "video/webm",
  server: undefined,
});

interface ApiResponse {
  data: AvailableAnimeServer[];
}

onMounted(async () => {
  const { data }: ApiResponse = await useServer().fetch();
  servers.value = data;
  sources.server = data[0].name;
  watchAnimeStore.fetch(episodeId, sources.server);
});

watch(
  () => videosMP4.value,
  (val) => {
    if (val.length) {
      sources.src = val[0].url;
    }
  }
);

watch(
  () => sources.server,
  (val) => watchAnimeStore.fetch(episodeId, val)
);
</script>
<template>
  <div>
    <VideoLoading v-if="loading" />
    <VideoPlayer
      v-else
      class="video-player vjs-big-play-centered w-full h-[600px] rounded-md"
      crossorigin="anonymous"
      playsinline
      controls
      :height="720"
      :playback-rates="[0.7, 1.0, 1.5, 2.0]"
      :sources="[sources]"
    />

    <VideoDetailLoadingSkeleton v-if="loading || infoLoading" />
    <div v-else class="flex flex-row justify-between space-x-4 mt-4">
      <div>
        <h1 class="text-2xl font-body text-primary-600">{{ info?.title }}</h1>
      </div>
      <div>
        <div class="inline-flex space-x-2">
          <select v-model="sources.server" class="p-2 bg-white shadow">
            <option
              v-for="(server, index) in filteredAvaillableServer"
              :key="index.toString()"
              :value="server"
            >
              {{ server }}
            </option>
          </select>
          <select v-model="sources.src" class="p-2 bg-white shadow">
            <option
              v-for="(video, index) in videosMP4"
              :key="index.toString()"
              :value="video.url"
            >
              {{ video.resolution }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
