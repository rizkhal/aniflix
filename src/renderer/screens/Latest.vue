<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useAnimeRecentEpisode } from "../stores";

const page = ref<number>(1);
const store = useAnimeRecentEpisode();
const { loading, data } = storeToRefs(store);

onMounted(() => {
  store.fetch();
});

const onPrev = () => {
  if (page.value > 1) {
    page.value--;
  }
};

const onNext = () => {
  if (data.value?.hasNextPage) {
    page.value++;
  }
};

watch(
  () => page.value,
  (val) => store.fetch(val)
);
</script>
<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <v-watch-list-card-skeleton
        v-if="loading"
        v-for="(i, index) in Array.from({ length: 10 })"
        :key="index * 2"
      />
      <v-recent-card
        v-else
        v-for="(item, index) in data?.results"
        :key="index.toString()"
        :item="item"
      />
    </div>
    <v-pagination
      @prev="onPrev"
      @next="onNext"
      :currentPage="page"
      :hasMorePages="data?.hasNextPage"
    />
  </div>
</template>
