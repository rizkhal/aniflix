<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useProvider } from "../stores";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";

const providerStore = useProvider();
const { provider, workingProviders } = storeToRefs(providerStore);

const model = reactive({
  provider: provider.value,
});

onMounted(() => {
  providerStore.fetch();
});

const save = () => {
  providerStore.set(model.provider);
  toast("Setting updated", {
    theme: "auto",
  });
};
</script>
<template>
  <div class="mt-4">
    <div class="flex flex-col md:flex-row border-b border-gray-200 pb-4 mb-4">
      <div class="w-1/3 mx-2 mt-1 text-slate-700">
        <span class="font-body">Provider</span>
        <div class="text-xs leading-relaxed text-gray-500 mt-1 font-light">
          Provider is anime site you want to watch, we will provide anime where
          the provider you select
        </div>
      </div>
      <div class="flex-1 flex flex-col md:flex-row sm:mt-2 md:items-center">
        <div class="w-full flex-1 mx-2">
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
      </div>
    </div>

    <div class="flex flex-col md:flex-row border-b border-gray-200 pb-4 mb-4">
      <div class="w-1/3 mx-2 mt-1 text-slate-700">
        <span class="font-body">Theme</span>
        <div class="text-xs leading-relaxed text-gray-500 mt-1 font-light">
          Change theme you want
        </div>
      </div>
      <div class="flex-1 flex flex-col md:flex-row sm:mt-2 md:items-center">
        <div class="w-full flex-1 mx-2">
          <select class="w-full p-2 rounded bg-white shadow-sm border">
            <option>Default</option>
          </select>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row">
      <div
        class="md:block hidden w-72 mx-2 font-bold h-6 mt-3 text-gray-800"
      ></div>
      <div
        class="flex-1 flex flex-col space-y-4 md:space-y-0 md:justify-end md:flex-row"
      >
        <button
          @click="save"
          class="bg-primary-600 py-1 px-4 text-xs rounded-md text-primary-100"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
</template>
