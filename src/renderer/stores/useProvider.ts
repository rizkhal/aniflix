import f from "wretch";
import { defineStore } from "pinia";
import { RemovableRef, useLocalStorage } from "@vueuse/core";

const SUPPORTED_PROVIDERS = import.meta.env.VITE_ANIME_PROVIDERS;

type AnimeProvider = {
  name: string;
  isWorking: boolean;
};

type Provider = {
  loading: boolean;
  data: Array<AnimeProvider>;
  provider: RemovableRef<null | string>;
};

export const useProvider = defineStore("provider", {
  state: (): Provider => ({
    data: [],
    loading: true,
    provider: useLocalStorage("provider", null),
  }),
  getters: {
    workingProviders: (state) => {
      const supported = SUPPORTED_PROVIDERS.split(",");

      return state.data
        .filter((item) => item.isWorking)
        .filter((item) => supported.includes(item.name.toLowerCase()));
    },
  },
  actions: {
    async fetch() {
      this.loading = true;
      f(
        `https://raw.githubusercontent.com/consumet/providers-status/main/providers-list.json`
      )
        .get()
        .json((res) => {
          this.data = res[0].ANIME;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async set(provider: string) {
      this.provider = provider;
    },
  },
});
