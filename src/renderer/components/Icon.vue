<template>
  <div>
    <component :is="iconName"></component>
  </div>
</template>
<script setup lang="ts" name="VIcon">
import { h, ref, onMounted, RendererElement } from "vue";

const iconName: RendererElement = ref();

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "outline",
  },
  class: {
    type: String,
    default: "w-10 h-10",
  },
});

onMounted(async () => {
  const icon = await import(
    /* @vite-ignore */ `../../../node_modules/@heroicons/vue/24/${props.type}/esm/${props.name}.js`
  );

  iconName.value = h(icon.default, {
    class: props.class,
  });
});
</script>
