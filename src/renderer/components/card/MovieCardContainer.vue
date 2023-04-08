<script setup lang="ts">
import { ref } from "vue";
import MovieCardTitle from "./MovieCardTitle.vue";

const props = defineProps<{
  title: string;
  icon: string;
}>();

const SCROLL_VALUE = 700;

const containerRef = ref();

const toLeft = () => {
  containerRef.value.scroll({
    left: containerRef.value.scrollLeft - SCROLL_VALUE,
    behavior: "smooth",
  });
};

const toRight = () => {
  containerRef.value.scroll({
    left: containerRef.value.scrollLeft + SCROLL_VALUE,
    behavior: "smooth",
  });
};
</script>
<template>
  <div class="flex items-center justify-between">
    <MovieCardTitle :title="props.title" :icon="props.icon" />
    <div class="flex items-center space-x-2 fill-gray-500">
      <button @click="toLeft" class="cursor-pointer">
        <svg
          class="h-7 w-7 rounded-md border p-1 hover:border-primary-600 hover:fill-primary-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M13.293 6.293L7.58 12l5.7 5.7 1.41-1.42 -4.3-4.3 4.29-4.293Z"
          ></path>
        </svg>
      </button>
      <button @click="toRight" class="cursor-pointer">
        <svg
          class="h-7 w-7 rounded-md border p-1 hover:border-primary-600 hover:fill-primary-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M10.7 17.707l5.7-5.71 -5.71-5.707L9.27 7.7l4.29 4.293 -4.3 4.29Z"
          ></path>
        </svg>
      </button>
    </div>
  </div>

  <div class="relative overflow-auto mt-4 hide-scroll-bar">
    <div class="w-full bg-white shadow-xl min-w-0">
      <div ref="containerRef" class="inline-flex space-x-4">
        <slot />
      </div>
    </div>
  </div>
</template>
