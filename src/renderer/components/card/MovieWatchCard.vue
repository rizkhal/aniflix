<script setup lang="ts">
import Icon from "../Icon.vue";
import type { WatchAnimeItem } from "../../typings/index";

defineProps<{
  item: WatchAnimeItem;
}>();
</script>

<template>
  <div class="w-full lg:flex">
    <div
      class="h-full border border-r-none lg:w-48 w-full flex-none text-center overflow-hidden bg-center rounded-bl-none rounded-br-none rounded-t lg:rounded-l lg:rounded-tr-none shadow"
      :style="{ backgroundImage: `url(${item.thumbnail})` }"
      title="Mountain"
    ></div>
    <div
      class="w-full border border-l-none bg-white p-2 flex flex-col justify-between leading-normal rounded-r-none md:rounded-r"
    >
      <div class="mb-5">
        <RouterLink
          :to="{
            name: 'watch',
            params: { episodeId: item.episodeId },
          }"
          class="text-slate-600 font-bold text-md text-sm mb-2"
        >
          {{ item.title }}
        </RouterLink>
      </div>
      <div class="flex flex-col space-y-4">
        <div class="inline-flex items-center space-x-1">
          <Icon
            name="PlayCircleIcon"
            type="solid"
            class="w-5 h-5 fill-primary-500"
          />
          <span class="text-xs text-slate-500">{{ item.episode }}</span>
        </div>
        <div class="inline-flex items-center space-x-1">
          <Icon
            name="UserCircleIcon"
            type="solid"
            class="w-5 h-5 fill-primary-500"
          />
          <span class="text-xs text-slate-500">{{ item.author }}</span>
        </div>
        <div class="inline-flex items-center space-x-1">
          <Icon
            name="CalendarIcon"
            type="solid"
            class="w-5 h-5 fill-primary-500"
          />
          <span class="text-xs text-slate-500">{{ item.release }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
