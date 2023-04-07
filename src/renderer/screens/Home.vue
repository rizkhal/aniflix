<script setup lang="ts">
import { onMounted } from "vue";
import { useAnime } from "../stores";
import MovieFeedCard from "../components/card/MovieFeedCard.vue";
import MovieWatchCard from "../components/card/MovieWatchCard.vue";
import MovieCardContainer from "../components/card/MovieCardContainer.vue";
import MovieCardTitle from "../components/card/MovieCardTitle.vue";

const animex = useAnime();

onMounted(() => {
  animex.fetchOnGoing();
  animex.fetchLatest();
});
</script>
<template>
  <div>
    <MovieCardContainer icon="FireIcon" title="On Going">
      <MovieFeedCard
        class="flex-shrink-0"
        v-for="(item, index) in animex.data"
        :key="index.toString()"
        :item="item"
        @click="
          $router.push({
            name: 'detail',
            params: {
              animeId: item.animeId,
            },
          })
        "
      />
    </MovieCardContainer>

    <div class="flex flex-row justify-between items-center">
      <MovieCardTitle title="Latest" icon="ClockIcon" />
      <RouterLink
        to="/latest"
        href="#"
        class="font-body text-primary-600 text-sm"
        >Lihat Semua</RouterLink
      >
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <MovieWatchCard
        v-for="(item, index) in animex.latest.slice(0, 6)"
        :key="index.toString()"
        :item="item"
      />
    </div>
  </div>
</template>
