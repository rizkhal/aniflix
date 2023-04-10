<script setup lang="ts" name="VMovieCardTitle">
import Icon from "../Icon.vue";

const props = defineProps<{
  title: string;
  icon: string;
}>();
</script>
<template>
  <div
    class="font-body font-bold text-slate-600 relative text-base w-max flex items-center"
  >
    <Icon :name="props.icon" type="outline" class="w-5 h-5 mr-1" />
    {{ props.title }}
    <hr
      class="w-[60px] rounded-md bg-primary-500 h-1.5 absolute -right-[68px]"
    />
  </div>
</template>
