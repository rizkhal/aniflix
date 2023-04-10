<script setup lang="ts">
import { h, Ref, inject, onMounted } from "vue";
import SearchModal from "./components/SearchModal.vue";
import LoadingModal from "./components/LoadingModal.vue";
import { storeToRefs } from "pinia";
import { wait } from "../../utils";
import { useProvider } from "../../stores";

const modal: any = inject<Ref>("modalRef");
const providerStore = useProvider();
const { provider } = storeToRefs(providerStore);

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

  if (!provider.value) {
    wait(100).then(() => {
      modal.value.openModal({
        id: "provider",
        body: h(LoadingModal, {
          position: "center",
          onBackdropPress: () => false,
        }),
      });
    });
  }
});
</script>
<template>
  <slot />
</template>
