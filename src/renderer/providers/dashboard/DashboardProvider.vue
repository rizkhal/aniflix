<script setup lang="ts">
import Modal from "./Modal.vue";
import Navbar from "./Navbar.vue";
import Leftbar from "./Leftbar.vue";
import Rightbar from "./Rightbar.vue";
import { ref, provide, Ref, getCurrentInstance, computed } from "vue";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";

const modalRef: Ref<undefined> = ref();
const instance = getCurrentInstance();
const route: RouteLocationNormalizedLoaded = useRoute();

provide("modalRef", modalRef);
provide("appContext", instance ? instance.appContext : null);

const hasRightbar = computed(
  () => typeof route.meta.rightBar === "undefined" || route.meta.rightBar
);
</script>
<template>
  <div class="flex min-h-screen w-full">
    <Modal ref="modalRef" />

    <div class="flex flex-wrap" :class="[hasRightbar ? 'w-10/12' : 'w-full']">
      <Leftbar />

      <div
        class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen"
        id="main-content"
      >
        <Navbar />

        <div class="p-6 bg-gray-100 mb-20">
          <slot />
        </div>
      </div>
    </div>
    <Rightbar v-show="hasRightbar" />
  </div>
</template>
