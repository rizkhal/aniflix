<script setup lang="ts">
import { Episode } from "../../typings";
import Icon from "../Icon.vue";

defineProps<{
  episode: Episode;
}>();
</script>
<template>
  <li
    class="py-3 cursor-pointer hover:bg-slate-200 transition-all px-2 rounded"
  >
    <div class="flex items-center space-x-2">
      <div class="flex-shrink-0">
        <Icon
          name="PlayCircleIcon"
          type="solid"
          class="fill-primary-500 w-10 h-10"
        />
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold font-body text-gray-900 truncate">
          {{ episode.text }}
        </p>
        <p class="text-xs font-body text-gray-500 truncate">
          {{ episode.date }}
        </p>
      </div>
    </div>
  </li>
</template>
