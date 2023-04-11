<script setup lang="ts" name="VMovieCardTitle">
import Icon from "../Icon.vue";

const props = defineProps<{
  title: string;
  icon: string;
}>();
</script>
<template>
  <div
    class="font-body font-bold text-slate-600 dark:text-slate-200 relative text-base w-max flex items-center"
  >
    <Icon :name="props.icon" type="outline" class="w-5 h-5 mr-1" />
    {{ props.title }}
    <hr
      class="w-[60px] rounded-md bg-primary-600 h-1.5 ml-2"
    />
  </div>
</template>
