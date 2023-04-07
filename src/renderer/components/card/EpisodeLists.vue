<script setup lang="ts">
import type { Episode } from "../../typings";
import EspisodeListItem from "./EspisodeListItem.vue";

defineProps<{
  episodes: Episode[];
}>();
</script>
<template>
  <ul class="w-full h-[30em] border-t overflow-y-auto divide-y divide-gray-200">
    <EspisodeListItem
      :episode="episode"
      v-for="(episode, index) in episodes"
      :key="index"
      @click="
        $router.push({
          name: 'watch',
          params: { episodeId: episode.episodeId },
        })
      "
    />
  </ul>
</template>
