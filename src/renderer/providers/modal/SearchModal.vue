<script setup lang="ts">
import { ref, watch } from "vue";
import { debounce } from "../../utils";
import { storeToRefs } from "pinia";
import { useSearch } from "../../stores/useSearch";
import LoadingSpinner from "../../components/LoadingSpinner.vue";
import Icon from "../../components/Icon.vue";

const store = useSearch();
const search = ref<string | null>();

const { loading, data } = storeToRefs(store);

watch(
  () => search.value,
  debounce((newValue: string) => {
    if (newValue.length) store.execute(newValue);
  }, 800)
);
</script>
<template>
  <div>
    <form class="relative flex items-center border-b" action="#">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
      >
        <svg
          class="w-5 h-5 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        autofocus
        type="text"
        v-model="search"
        placeholder="Search..."
        class="w-full py-4 pl-12 outline-none placeholder-gray-400"
      />

      <div class="absolute inset-y-0 right-0 flex items-center pr-3">
        <LoadingSpinner v-if="loading" class="text-slate-500" />
        <button
          v-else
          class="flex items-center p-1.5 uppercase font-semibold tracking-wider text-gray-700 rounded-md border border-gray-200 focus:outline-none focus:border-gray-300 text-xxs"
          type="button"
        >
          Esc
        </button>
      </div>
    </form>
    <div class="overflow-auto">
      <ul
        v-show="!loading && data.length"
        class="w-full max-h-[36em] overflow-y-auto divide-y divide-gray-200"
      >
        <li
          v-for="(item, index) in data"
          :key="index.toString()"
          @click="
            $router.push({
              name: 'detail',
              params: { animeId: item.animeId },
            })
          "
          class="py-3 cursor-pointer hover:bg-slate-50 transition-all px-2 rounded"
        >
          <div class="flex space-x-2">
            <div class="flex-shrink-0">
              <img
                :src="item.cover"
                class="w-22 h-32 object-cover rounded-md cursor-pointer"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h1
                class="text-md font-semibold font-body text-gray-900 truncate mb-2"
              >
                {{ item.title }}
              </h1>
              <ul
                class="flex flex-col text-slate-500 font-body space-y-1.5 text-sm"
              >
                <li>{{ item.type }}</li>
                <li>{{ item.status }}</li>
                <li class="inline-flex items-center space-x-1">
                  <Icon
                    name="StarIcon"
                    type="solid"
                    class="w-4 h-4 fill-yellow-400"
                  />
                  <span>{{ item.score }}</span>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>

      <p class="p-10 text-lg text-center text-gray-400" v-show="loading">
        Loading..
      </p>
      <p
        class="p-10 text-lg text-center text-gray-400"
        v-show="!loading && !data.length"
      >
        Tidak ada hasil
      </p>
    </div>
  </div>
</template>
