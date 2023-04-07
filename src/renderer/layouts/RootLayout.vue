<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "RootLayout",
  setup() {
    const route = useRoute();

    const layout = computed(() => {
      const layout = route?.meta?.layout;

      if (layout) {
        return layout;
      }

      return "ProtectedLayout";
    });
    return {
      layout,
    };
  },
});
</script>

<template>
  <component :is="layout">
    <router-view v-slot="{ Component, route }" class="flex-1">
      <transition name="page">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </component>
</template>

<style lang="css">
.page-enter-active,
.page-leave-active {
  transition: opacity 50ms;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
