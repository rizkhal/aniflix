import { Ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ISearch, IAnimeResult, ANIME, IAnimeInfo } from "@consumet/extensions";

const InitialProvider = "Gogoanime";

interface AnimeProvider {
  fetchTopAiring: () => Promise<ISearch<IAnimeResult>>;
  fetchRecentEpisodes: () => Promise<ISearch<IAnimeResult>>;
  fetchAnimeInfo: (id: string) => Promise<IAnimeInfo>;
}

type ProviderType = "Gogoanime" | "Zoro";

interface ProviderState {
  provider: Promise<AnimeProvider>;
}

type ProviderRef<T extends ProviderType> = Omit<Ref<T>, "value"> & {
  get value(): T;
  set value(value: T | ProviderType);
};

const useAnimeProvider = defineStore("useAnimeProvider", {
  state: (): ProviderState => ({
    provider: new Promise((resolve) => resolve(new ANIME[InitialProvider]())),
  }),
  actions: {
    async setProvider(): Promise<void> {
      const p: ProviderRef<ProviderType> = useLocalStorage(
        "provider",
        InitialProvider
      ) as ProviderRef<ProviderType>;

      const consumerClass = ANIME[p.value];

      // idk how to define the type of `consumerInstance` :)
      const consumerInstance: any = new consumerClass();

      this.provider = new Promise((resolve) => resolve(consumerInstance));
    },
  },
});

export { ISearch, IAnimeResult, useAnimeProvider };
