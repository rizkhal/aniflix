<script setup lang="ts">
import { storeToRefs } from "pinia";
import { h, Ref, inject, onMounted } from "vue";
import SearchModal from "../modal/SearchModal.vue";
import { useAnimeRecomendation } from "../../stores";

const animex = useAnimeRecomendation();
const modal: any = inject<Ref>("modalRef");
const { loading, data } = storeToRefs(animex);

onMounted(() => {
  animex.fetch();
});

const openModal = () => {
  modal.value.openModal({
    body: h(SearchModal, {
      maxWidth: "2xl",
    }),
  });
};
</script>
<template>
  <aside
    class="w-1/2 md:w-1/3 lg:w-1/5 px-5 border-l py-10 min-h-screen lg:block bg-gray-100 border-r z-30"
  >
    <button
      @click="openModal"
      class="flex w-full items-center space-x-2 border border-gray-900/10 shadow-sm px-3 py-1.5 hover:border-gray-300 focus:outline-none focus:border-gray-300 rounded-lg"
    >
      <svg
        class="flex-none text-gray-400 -ml-1"
        width="24"
        height="24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m19 19-3.5-3.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <circle
          cx="11"
          cy="11"
          r="6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></circle>
      </svg>
      <span class="text-sm text-gray-400 flex-1 text-left">Search...</span>
      <span class="flex-none text-xs font-semibold text-gray-400">
        Ctrl + K
      </span>
    </button>

    <div class="mt-10">
      <span class="font-semibold text-gray-700">Rekomendasi Anime</span>
      <ul class="mt-4 text-gray-400 text-xs space-y-3">
        <template
          v-for="(item, index) in data.slice(0, 5)"
          :key="index.toString()"
        >
          <li class="flex space-y-3 space-x-3">
            <img
              :src="item.thumbnail"
              class="w-1/3 rounded-md h-auto cursor-pointer"
              :alt="item.title"
              @click="
                $router.push({
                  name: 'detail',
                  params: { animeId: item.animeId },
                })
              "
            />
            <div class="flex flex-col justify-between">
              <div class="flex flex-col space-y-1">
                <RouterLink
                  :to="{ name: 'detail', params: { animeId: item.animeId } }"
                  class="text-gray-700 font-semibold"
                >
                  {{ item.title }}
                </RouterLink>
                <span class="text-xxs hidden xl:block">
                  {{ item.genres.slice(" ").join(", ") }}
                </span>
                <span class="text-xxs hidden xl:block">
                  {{ item.release }}
                </span>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </aside>
</template>
