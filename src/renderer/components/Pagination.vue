<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  hasMorePages: boolean;
}>();

defineEmits(["prev", "next"]);
</script>
<template>
  <div class="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
    <div
      class="w-full flex items-center justify-between border-t border-gray-200"
    >
      <button
        @click.prevent="$emit('prev')"
        class="flex items-center pt-3 text-gray-600 hover:text-primary-700 cursor-pointer disabled:cursor-not-allowed"
        :disabled="currentPage === 1"
      >
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.1665 4H12.8332"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.1665 4L4.49984 7.33333"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.1665 4.00002L4.49984 0.666687"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="text-sm ml-3 font-medium leading-none">Sebelumnya</p>
      </button>
      <button
        @click.prevent="$emit('next')"
        class="flex items-center pt-3 text-gray-600 hover:text-primary-700 cursor-pointer disabled:cursor-not-allowed"
        :disabled="!hasMorePages"
      >
        <p class="text-sm font-medium leading-none mr-3">Selanjutnya</p>
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.1665 4H12.8332"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.5 7.33333L12.8333 4"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.5 0.666687L12.8333 4.00002"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
