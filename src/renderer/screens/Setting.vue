<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useSetting, themes } from "../stores/useSetting";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";
import { ucfirst } from "../utils";

const setting = useSetting();
const { theme, provider, providers } = storeToRefs(setting);

const model = reactive({
  theme: theme.value,
  provider: provider.value,
});

onMounted(() => {
  setting.fetchProviders();
});

const save = () => {
  setting.update(model);

  toast("Setting updated", {
    theme: "colored",
  });
};
</script>
<template>
  <div class="mt-4">
    <div
      class="flex flex-col md:flex-row border-b border-gray-200 dark:border-slate-900 pb-4"
    >
      <div class="w-1/3 mx-2 text-slate-700">
        <span class="font-body dark:text-primary-600">Provider</span>
        <div
          class="text-xs leading-relaxed text-gray-500 font-light dark:text-slate-200"
        >
          Provider is anime site you want to watch, we will provide anime where
          the provider you select
        </div>
      </div>
      <div class="flex-1 flex flex-col md:flex-row sm:mt-2 md:items-center">
        <div class="w-full flex-1 mx-2">
          <select
            v-model="model.provider"
            class="w-full p-2 rounded bg-white shadow-sm border dark:bg-slate-700 dark:border-slate-900 focus:outline-none dark:text-slate-200"
          >
            <option
              v-for="(item, index) in providers"
              :key="index.toString()"
              :value="item.name"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col md:flex-row border-b border-gray-200 dark:border-slate-900 py-4"
    >
      <div class="w-1/3 mx-2 text-slate-700">
        <span class="font-body dark:text-primary-600">Theme</span>
        <div
          class="text-xs leading-relaxed text-gray-500 font-light dark:text-slate-200"
        >
          Change theme you want
        </div>
      </div>
      <div class="flex-1 flex flex-col md:flex-row sm:mt-2 md:items-center">
        <div class="w-full flex-1 mx-2">
          <select
            v-model="model.theme"
            class="w-full p-2 rounded bg-white shadow-sm border dark:bg-slate-700 dark:border-slate-900 focus:outline-none dark:text-slate-200"
          >
            <option
              v-for="(theme, index) in themes"
              :value="theme"
              :key="index"
            >
              {{ ucfirst(theme) }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row mt-4">
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
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
