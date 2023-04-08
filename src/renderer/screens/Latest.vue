<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAnimeLatest } from "../stores";
import { onMounted, ref, watch } from "vue";
import Pagination from "../components/Pagination.vue";
import MovieWatchCard from "../components/card/MovieWatchCard.vue";
import WatchListCardSkeleton from "../components/skeleton/WatchListCardSkeleton.vue";

const animex = useAnimeLatest();

const page = ref(1);

onMounted(() => {
  animex.fetch();
});

const { data, loading, hasMorePages } = storeToRefs(animex);

const onPrev = () => {
  if (page.value > 1) {
    page.value--;
  }
};

const onNext = () => {
  if (hasMorePages.value) {
    page.value++;
  }
};

watch(
  () => page.value,
  (val) => animex.fetch(val)
);
</script>
<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <WatchListCardSkeleton
        v-if="loading"
        v-for="(i, index) in Array.from({ length: 10 })"
        :key="index * 2"
      />
      <MovieWatchCard
        v-else
        v-for="(item, index) in data"
        :key="index.toString()"
        :item="item"
      />
    </div>
    <Pagination
      @prev="onPrev"
      @next="onNext"
      :currentPage="page"
      :hasMorePages="hasMorePages"
    />
  </div>
</template>
