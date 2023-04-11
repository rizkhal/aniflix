<script setup lang="ts">
import Modal from "./components/Modal.vue";
import Navbar from "./components/Navbar.vue";
import Leftbar from "./components/Leftbar.vue";
import { useSetting } from "../../stores";
import { ref, provide, Ref, onMounted } from "vue";

const setting = useSetting();
const modalRef: Ref<undefined> = ref();

provide("modalRef", modalRef);

onMounted(() => {
  setting.initializeShortcut();
});
</script>
<template>
  <div class="flex min-h-screen bg-slate-100 dark:bg-slate-800 w-full">
    <Modal ref="modalRef" />

    <div class="flex flex-wrap w-full">
      <Leftbar v-show="setting.sidebar" />

      <div
        :class="{ 'lg:pl-64': setting.sidebar }"
        class="w-full pl-0 min-h-screen"
        id="main-content"
      >
        <Navbar />

        <div class="p-6 mb-20">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
