<script setup lang="ts">
import { onMounted } from "vue";
import { useAnimeLatest, useAnimeOnGoing } from "../stores";
import MovieCard from "../components/card/MovieCard.vue";
import MovieWatchCard from "../components/card/MovieWatchCard.vue";
import MovieCardTitle from "../components/card/MovieCardTitle.vue";
import MovieCardContainer from "../components/card/MovieCardContainer.vue";
import FeedCardSkeleton from "../components/skeleton/FeedCardSkeleton.vue";
import WatchListCardSkeleton from "../components/skeleton/WatchListCardSkeleton.vue";
import { storeToRefs } from "pinia";

const latestStore = useAnimeLatest();
const onGoingStore = useAnimeOnGoing();

const { data: latest, loading: latestLoading } = storeToRefs(latestStore);
const { data: onGoing, loading: onGoingLoading } = storeToRefs(onGoingStore);

onMounted(() => {
  latestStore.fetch();
  onGoingStore.fetch();
});
</script>
<template>
  <div class="flex flex-col space-y-8">
    <MovieCardContainer title="On Going" icon="FireIcon">
      <FeedCardSkeleton
        v-if="onGoingLoading"
        v-for="(_, index) in Array.from({ length: 7 })"
        :key="index"
      />
      <MovieCard
        v-else
        v-for="(item, index) in onGoing"
        :key="index.toString()"
        :item="item"
        @click="
          $router.push({ name: 'detail', params: { animeId: item.animeId } })
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
      <WatchListCardSkeleton
        v-if="latestLoading"
        v-for="(i, index) in Array.from({ length: 6 })"
        :key="index * 2"
      />
      <MovieWatchCard
        v-else
        v-for="(item, index) in latest.slice(0, 6)"
        :key="index.toString()"
        :item="item"
      />
    </div>
  </div>
</template>
