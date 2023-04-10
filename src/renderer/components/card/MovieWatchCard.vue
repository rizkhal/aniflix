<script setup lang="ts" name="VMovieWatchCard">
import Icon from "../Icon.vue";
import type { WatchAnimeItem } from "../../typings/index";

defineProps<{
  item: WatchAnimeItem;
}>();
</script>

<template>
  <main class="w-full lg:flex">
    <div
      :title="item.title"
      :style="{ backgroundImage: `url(${item.image})` }"
      class="h-full border border-r-none lg:w-48 w-full flex-none text-center overflow-hidden bg-center rounded-bl-none rounded-br-none rounded-t lg:rounded-l lg:rounded-tr-none shadow"
    ></div>
    <div
      class="w-full h-32 border border-l-none bg-white shadow p-2 flex flex-col justify-between leading-normal rounded-r-none md:rounded-r"
    >
      <span class="text-slate-600 font-bold text-md text-xs mb-2">
        {{ item.title }}
      </span>
    </div>
  </main>
</template>
