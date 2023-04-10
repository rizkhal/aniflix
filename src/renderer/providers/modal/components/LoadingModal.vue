<script setup lang="ts">
import { storeToRefs } from "pinia";
import { wait } from "../../../utils";
import { useProvider } from "../../../stores";
import { onMounted, reactive, ref } from "vue";
import { getInstance } from "../../../hooks/useModal";
import LoadingSpinner from "../../../components/LoadingSpinner.vue";
import { toast } from "vue3-toastify";
import { useAnimeTopAiring, useAnimeRecentEpisode } from "../../../stores";

const loading = ref<boolean>(true);

const providerStore = useProvider();
const { provider, workingProviders } = storeToRefs(providerStore);

const modal = getInstance("provider");

const model = reactive({
  provider: provider.value,
});

const save = () => {
  if (model.provider) {
    providerStore.set(model.provider);
    modal.closeModal();

    wait(200).then(() => {
      toast(`Success select provider`, {
        theme: "colored",
      });
    });
  }
};

onMounted(() => {
  providerStore.fetch();

  wait(1000).then(() => {
    loading.value = false;
  });
});
</script>
<template>
  <div class="p-4 w-full">
    <div v-show="!loading" class="w-full flex flex-col space-y-2">
      <div>
        <label class="font-body text-sm mb-1 text-slate-600"
          >Select Provider</label
        >
        <select
          v-model="model.provider"
          class="w-full p-2 rounded bg-white shadow-sm border"
        >
          <option
            v-for="(item, index) in workingProviders"
            :key="index.toString()"
            :value="item.name"
          >
            {{ item.name }}
          </option>
        </select>
      </div>

      <div class="w-full flex flex-row justify-end items-end">
        <button
          @click="save"
          class="px-3 py-1 bg-primary-500 rounded text-primary-50 text-sm hover:bg-primary-600 transition-all"
        >
          Save
        </button>
      </div>
    </div>

    <div
      v-show="loading"
      class="flex flex-col space-y-3 items-center justify-center"
    >
      <LoadingSpinner />
      <h1 class="font-body">Initialization...</h1>
    </div>
  </div>
</template>
