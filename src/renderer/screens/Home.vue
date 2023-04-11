<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAnimeTopAiring, useAnimeRecentEpisode } from "../stores";

const topAiringStore = useAnimeTopAiring();
const recentEpisodeStore = useAnimeRecentEpisode();

const { loading: topAiringLoading, data: topAirings } =
  storeToRefs(topAiringStore);

const { loading: recentLoading, data: recents } =
  storeToRefs(recentEpisodeStore);

onMounted(() => {
  topAiringStore.fetch();
  recentEpisodeStore.fetch();
});
</script>
<template>
  <div class="flex flex-col space-y-4">
    <v-movie-card-container title="Top Airing" icon="FireIcon">
      <v-feed-card-skeleton
        v-if="topAiringLoading"
        v-for="(_, index) in Array.from({ length: 7 })"
        :key="index"
      />
      <v-movie-card
        v-else
        v-for="(item, index) in topAirings?.results"
        :key="index.toString()"
        :item="item"
      />
    </v-movie-card-container>

    <div class="flex flex-row justify-between items-center">
      <v-movie-card-title title="Recents" icon="ClockIcon" />
      <router-link
        to="/latest"
        href="#"
        class="font-body text-primary-600 text-sm"
        >View All</router-link
      >
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <v-watch-list-card-skeleton
        v-if="recentLoading"
        v-for="(i, index) in Array.from({ length: 6 })"
        :key="(index * 2).toString()"
      />
      <v-recent-card
        v-else
        v-for="(item, index) in recents?.results.slice(0, 12)"
        :key="index.toString()"
        :item="item"
      />
    </div>
  </div>
</template>
