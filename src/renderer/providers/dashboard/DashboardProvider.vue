<script setup lang="ts">
import Leftbar from "./Leftbar.vue";
import Rightbar from "./Rightbar.vue";
import Navbar from "./Navbar.vue";
import Modal from "../../components/Modal.vue";
import { ref, provide, Ref, getCurrentInstance } from "vue";

const modalRef: Ref<undefined> = ref();
const instance = getCurrentInstance();

provide("modalRef", modalRef);
provide("appContext", instance ? instance.appContext : null);
</script>
<template>
  <div class="flex min-h-screen w-full">
    <Modal ref="modalRef" />

    <div class="flex flex-wrap w-full">
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
    <Rightbar
      v-if="typeof $route.meta.rightBar === 'undefined' || $route.meta.rightBar"
    />
  </div>
</template>
