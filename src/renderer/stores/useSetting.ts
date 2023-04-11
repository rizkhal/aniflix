import f from "wretch";
import { defineStore } from "pinia";
import { RemovableRef, useLocalStorage } from "@vueuse/core";

const InitialTheme = "System";
const InitialProvider = "Gogoanime";
const SUPPORTED_PROVIDERS = import.meta.env.VITE_ANIME_PROVIDERS;
const PROVIDER_URL = `https://raw.githubusercontent.com/consumet/providers-status/main/providers-list.json`;

interface UpdateModel {
  provider: string;
  theme: string;
}

interface AnimeProvider {
  name: string;
  isWorking: boolean;
}

interface SettingState {
  loading: boolean;
  data: Array<AnimeProvider>;
  theme: RemovableRef<string>;
  provider: RemovableRef<string>;
}

export const useSetting = defineStore("useSetting", {
  state: (): SettingState => ({
    data: [],
    loading: true,
    theme: useLocalStorage("theme", InitialTheme),
    provider: useLocalStorage("provider", InitialProvider),
  }),
  getters: {
    providers: (state) => {
      const supported = SUPPORTED_PROVIDERS.split(",");

      return state.data
        .filter((item) => item.isWorking)
        .filter((item) => supported.includes(item.name.toLowerCase()));
    },
  },
  actions: {
    async fetchProviders() {
      this.loading = true;
      f(PROVIDER_URL)
        .get()
        .json((res) => {
          this.data = res[0].ANIME;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async update(state: UpdateModel) {
      Object.assign(this.$state, state);

      switch (state.theme) {
        case "system":
          await window.darkMode.system();
          break;
        case "dark":
          await window.darkMode.dark();
          break;
        case "light":
          await window.darkMode.light();
          break;
      }
    },
  },
});

export const themes = ["system", "dark", "light"];
