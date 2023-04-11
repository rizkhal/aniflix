<script setup lang="ts">
import Modal from "./components/Modal.vue";
import Navbar from "./components/Navbar.vue";
import Leftbar from "./components/Leftbar.vue";
import { ref, provide, Ref, getCurrentInstance } from "vue";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";

const modalRef: Ref<undefined> = ref();
const instance = getCurrentInstance();
const route: RouteLocationNormalizedLoaded = useRoute();

provide("modalRef", modalRef);
provide("appContext", instance ? instance.appContext : null);
</script>
<template>
  <div class="flex min-h-screen bg-slate-100 dark:bg-slate-800 w-full">
    <Modal ref="modalRef" />

    <div class="flex flex-wrap w-full">
      <Leftbar />

      <div class="w-full pl-0 lg:pl-64 min-h-screen" id="main-content">
        <Navbar />

        <div class="p-6 mb-20">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
