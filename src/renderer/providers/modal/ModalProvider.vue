<script setup lang="ts">
import { h, Ref, inject, onMounted } from "vue";
import SearchModal from "./components/SearchModal.vue";
import { hasInstance } from "../../hooks/useInstance";
import { wait } from "../../utils";

const modal: any = inject<Ref>("modalRef");

const openModal = () => {
  modal.value.openModal({
    id: "searchModal",
    body: h(SearchModal, {
      maxWidth: "2xl",
    }),
  });
};

const onKeyDown = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "k") {
    if (hasInstance()) {
      modal.value.closeModal();
      wait(300).then(openModal);
    } else {
      openModal();
    }
  }
};

onMounted(() => {
  window.addEventListener("keydown", onKeyDown);
});
</script>
<template>
  <slot />
</template>
