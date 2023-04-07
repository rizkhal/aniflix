<script setup lang="ts">
import { h, inject } from "vue";
import MovieCard from "./MovieCard.vue";
import AuthModal from "../AuthRequiredModal.vue";
import type { AnimeItem } from "../../typings/index";

defineProps<{
  item: AnimeItem;
}>();

const modal: any = inject("modalRef");

const onBookmark = () => {
  modal.value.openModal({
    body: h(AuthModal, {
      closeModal: modal.value.closeModal,
    }),
  });
};
</script>

<template>
  <MovieCard :item="item" />
</template>
