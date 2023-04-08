<script setup lang="ts">
import { Ref, inject, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAnimeInfo } from "../stores";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import Icon from "../components/Icon.vue";
import EpisodeLists from "../components/card/EpisodeLists.vue";
import DetailSkeleton from "../components/skeleton/DetailSkeleton.vue";
import { toast } from "vue3-toastify";

const animex = useAnimeInfo();
const modal: any = inject<Ref>("modalRef");
const route: RouteLocationNormalizedLoaded = useRoute();

const { animeId } = route.params;
animex.fetch(animeId);

const { info, loading } = storeToRefs(animex);

onMounted(() => {});

const addToFavorit = () => {
  toast("Wow so easy !", {
    theme: "auto",
  });
};
</script>

<template>
  <DetailSkeleton v-if="loading" />

  <div v-if="!loading && info">
    <div class="flex flex-row space-x-4 mt-4">
      <div class="relative w-96 h-96 rounded-lg overflow-hidden cursor-pointer">
        <img
          :src="info.image"
          :alt="info.title"
          class="object-cover w-80 h-full"
        />
      </div>
      <div class="w-full" v-if="!loading">
        <h1 class="text-2xl font-body font-semibold text-slate-800">
          {{ info.title }}
        </h1>
        <p class="mt-2 leading-relaxed text-sm font-light text-slate-600">
          {{ info.description }}
        </p>

        <div class="flex flex-col space-y-4">
          <div class="flex flex-row space-x-2 mt-6">
            <div
              class="bg-primary-600 px-2 text-primary-50 rounded font-body"
              v-for="(genre, index) in info.genre"
              :key="index"
            >
              <span class="text-xs">{{ genre }}</span>
            </div>
          </div>
          <div class="inline-flex items-center space-x-1.5">
            <Icon
              name="StarIcon"
              class="w-5 h-5 fill-yellow-400"
              type="solid"
            />
            <Icon
              name="StarIcon"
              class="w-5 h-5 fill-yellow-400"
              type="solid"
            />
            <Icon
              name="StarIcon"
              class="w-5 h-5 fill-yellow-400"
              type="solid"
            />
            <Icon
              name="StarIcon"
              class="w-5 h-5 fill-yellow-400"
              type="solid"
            />
            <Icon
              name="StarIcon"
              class="w-5 h-5 text-yellow-400"
              type="outline"
            />
            <span class="text-sm text-slate-700">
              {{ info.rating.ratingValue }} / {{ info.rating.ratingCount }}
            </span>
          </div>
        </div>
        <div class="mt-10">
          <button
            @click="addToFavorit"
            class="inline-flex items-center space-x-1 px-3 py-2 rounded text-primary-50 bg-primary-500 hover:bg-primary-600"
          >
            <Icon name="HeartIcon" class="w-4 h-4" />
            <span class="text-xs font-body">Tambah ke Favorit</span>
          </button>
        </div>
      </div>
    </div>

    <div class="mt-8 relative overflow-x-auto sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <tbody>
          <template
            v-for="[key, value] in Object.entries(info.details)"
            :key="key"
          >
            <tr v-if="key !== 'Studio'" class="border-b">
              <td class="px-4 py-4">{{ key }}</td>
              <td class="px-4 py-4">{{ !value.length ? "Unknown" : value }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="mt-8">
      <iframe :src="info.thrailer" class="w-full h-[40em] rounded-md"></iframe>
    </div>

    <div class="mt-8">
      <h1 class="mb-3 font-body">Daftar Episode {{ info.title }}</h1>
      <EpisodeLists :episodes="info.episodes" />
    </div>
  </div>
</template>
