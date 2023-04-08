<script setup lang="ts">
import type { AnimeItem } from "../../typings/index";
import Icon from "../Icon.vue";

defineProps<{
  item: AnimeItem;
}>();
</script>
<template>
  <div class="flex-shrink-0 relative rounded-lg overflow-hidden cursor-pointer">
    <img
      :src="item.cover"
      class="object-cover self-center w-60 h-80"
      :alt="item.title"
    />
    <div
      class="absolute top-0 h-full w-full bg-gradient-to-t from-black p-3 flex flex-col justify-end"
    >
      <div class="flex flex-col items-center space-y-2">
        <div class="absolute w-full inset-x-0 top-3">
          <div class="flex flex-row justify-between px-3">
            <div class="px-2 py-0.5 bg-primary-600/80 rounded text-slate-50">
              {{ item.type }}
            </div>
            <div
              class="flex flex-row bg-black/70 px-1 py-0.5 rounded space-x-1.5"
            >
              <Icon
                name="StarIcon"
                type="solid"
                class="w-5 h-5 text-yellow-400"
              />
              <span class="text-slate-50">{{ item.score }}</span>
            </div>
          </div>
        </div>

        <span
          class="capitalize text-md text-white font-medium text-center drop-shadow-md"
        >
          {{ item.title }}
        </span>
      </div>
    </div>
  </div>
</template>
