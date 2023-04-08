<script setup lang="ts">
import LoadingSpinner from "../LoadingSpinner.vue";
</script>
<template>
  <div
    class="bg-black w-full h-[600px] rounded-md flex flex-col space-y-3 justify-center items-center"
  >
    <LoadingSpinner class="text-slate-200" />
    <span class="text-slate-50">Loading...</span>
  </div>
</template>
