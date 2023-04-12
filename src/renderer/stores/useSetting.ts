import f from "wretch";
import { defineStore } from "pinia";
import { Setting } from "../typings";
import { RemovableRef, useLocalStorage } from "@vueuse/core";

const InitialSidebar = true;
const InitialTheme = "system";
const InitialProvider = "Gogoanime";
const SUPPORTED_PROVIDERS = import.meta.env.VITE_ANIME_PROVIDERS;
const PROVIDER_URL = `https://raw.githubusercontent.com/consumet/providers-status/main/providers-list.json`;

interface AnimeProvider {
  name: string;
  isWorking: boolean;
}

interface SettingState {
  loading: boolean;
  sidebar: RemovableRef<boolean>;
  data: Array<AnimeProvider>;
  theme: RemovableRef<string>;
  provider: RemovableRef<string>;
  proxy: Promise<string>;
}

export const useSetting = defineStore("useSetting", {
  state: (): SettingState => ({
    data: [],
    loading: true,
    theme: useLocalStorage("theme", InitialTheme),
    sidebar: useLocalStorage("sidebar", InitialSidebar),
    provider: useLocalStorage("provider", InitialProvider),
    proxy: window.setting.getProxy().then((state) => state),
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
    async watch() {
      window.setting.getProxy();
    },
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
    closeSidebar() {
      this.sidebar = false;
    },
    toggleSidebar() {
      this.sidebar = !this.sidebar;
    },
    initializeShortcut() {
      // FIXME: not working on first render
      window.setting.toggle(() => {
        this.$state.sidebar = !this.$state.sidebar;
      });
    },
    update(model: Setting) {
      Object.assign(this.$state, model);
      window.setting.setProxy(model.proxy);

      switch (model.theme) {
        case "system":
          window.darkMode.system();
          break;
        case "dark":
          window.darkMode.dark();
          break;
        case "light":
          window.darkMode.light();
          break;
      }
    },
  },
});

export const themes = ["system", "dark", "light"];
