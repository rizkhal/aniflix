<script setup lang="ts" name="VRecentCard">
import { useAnimeInfo } from "../../stores";
import { storeToRefs } from "pinia";
import { IAnimeResult } from "@consumet/extensions";
import Icon from "../Icon.vue";
import { AnimeItem } from "../../typings/index";
import { wait } from "../../utils";

import "../../assets/css/tippy.css";

type ApiResponse = IAnimeResult & AnimeItem;

const props = defineProps<{
  item: ApiResponse;
}>();

const store = useAnimeInfo();

const { loading, data } = storeToRefs(store);

const onStateChange = (event: any) => {
  if (event.isVisible && event.isEnabled && event.isMounted && event.isShown) {
    loading.value = true;
    wait(100).then(() => {
      store.fetch(props.item.id);
    });
  } else {
    loading.value = true;
  }
};
</script>

<template>
  <v-tippy
    interactive
    theme="aniflix"
    placement="left"
    inlinePositioning
    :offset="[0, -80]"
    class="relative w-full lg:flex"
    @state="onStateChange"
  >
    <div
      :style="{ backgroundImage: `url(${item.image})` }"
      class="h-full lg:w-48 border border-r-0 dark:border-slate-900 w-full flex-none text-center overflow-hidden bg-center rounded-bl-none rounded-br-none rounded-t lg:rounded-l lg:rounded-tr-none shadow"
    ></div>
    <div
      class="w-full h-32 border border-l-none bg-white dark:bg-slate-700 dark:border-slate-900 shadow p-2 flex flex-col justify-between leading-normal rounded-r-none md:rounded-r"
    >
      <span
        class="text-slate-600 font-bold text-md text-xs mb-2 leading-relaxed dark:text-slate-200"
      >
        {{ item.title }}
      </span>
    </div>

    <template #content>
      <div v-if="loading || !data" class="w-full h-full bg-slate-500 p-2">
        Loading..
      </div>
      <div
        v-else
        class="w-72 h-72 flex flex-col justify-between bg-slate-500 p-2"
      >
        <div class="flex flex-col space-y-2">
          <h1 class="text-slate-50 font-body">{{ data.title }}</h1>
          <div class="flex flex-row justify-between">
            <div class="inline-flex items-center">
              <div class="inline-flex items-center space-x-1">
                <Icon
                  name="StarIcon"
                  type="solid"
                  class="w-4 h-4 fill-yellow-400 -mt-1"
                />
                <span>N/A</span>
              </div>
              <span class="ml-2">Ep: {{ data.totalEpisodes }}</span>
            </div>
            <div>
              <span class="py-1 px-2 bg-slate-300 text-slate-700 rounded-md">
                {{ data.type }}
              </span>
            </div>
          </div>
          <div>
            <p>{{ data.description?.substring(0, 100) }} ...</p>
          </div>
        </div>
        <div class="w-full flex flex-row space-x-2">
          <button
            @click="
              $router.push({
                name: 'watch',
                params: {
                  animeId: data.id,
                  episodeId: item.episodeId,
                },
              })
            "
            class="w-full rounded bg-slate-400 hover:bg-slate-600 transition-all"
          >
            Watch
          </button>
          <button
            class="p-2 rounded bg-slate-400 hover:bg-primary-600 transition-all"
          >
            <v-icon name="HeartIcon" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </template>
  </v-tippy>
</template>
