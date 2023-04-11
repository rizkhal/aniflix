<script setup lang="ts">
import { h, Ref, inject, onMounted } from "vue";
import SearchModal from "./components/SearchModal.vue";

const modal: any = inject<Ref>("modalRef");

const onKeyDown = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "k") {
    modal.value.openModal({
      body: h(SearchModal, {
        maxWidth: "2xl",
      }),
    });
  }
};

onMounted(() => {
  window.addEventListener("keydown", onKeyDown);
});
</script>
<template>
  <slot />
</template>
