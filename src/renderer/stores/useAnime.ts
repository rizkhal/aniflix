import { defineStore } from "pinia";
import { fetchTopAiring } from "../scripts/zoro";
import type {
  ISource,
  ISearch,
  TopAiring,
  IAnimeInfo,
  ProviderRef,
  IAnimeResult,
  ProviderType,
  ProviderState,
} from "../typings";
import { useLocalStorage } from "@vueuse/core";
import { ANIME } from "@consumet/extensions";

const InitialProvider = "Gogoanime";

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

interface EpisodeState {
  loading: boolean;
  data: IAnimeInfo | null;
}

export const useAnimeInfo = defineStore("useAnimeInfo", {
  state: (): EpisodeState => ({
    loading: true,
    data: null,
  }),
  actions: {
    async fetch(id: string) {
      this.loading = true;

      const store = useAnimeProvider();
      store.setProvider();

      const provider = await store.provider;

      provider
        .fetchAnimeInfo(id)
        .then((response) => {
          this.data = response;
          console.log(response);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});

type ApiResponse = ISearch<IAnimeResult | TopAiring> | null;

type State = {
  loading: boolean;
  data: ApiResponse;
};

export const useAnimeRecentEpisode = defineStore("useAnimeRecentEpisode", {
  state: (): State => ({
    loading: true,
    data: null,
  }),
  actions: {
    async fetch() {
      this.loading = true;

      const store = useAnimeProvider();
      store.setProvider();

      const provider = await store.provider;

      provider
        .fetchRecentEpisodes()
        .then((response: ApiResponse) => {
          this.data = response;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});

export const useAnimeTopAiring = defineStore("useAnimeTopAiring", {
  state: (): State => ({
    loading: true,
    data: null,
  }),
  actions: {
    async fetch() {
      this.loading = true;

      const store = useAnimeProvider();
      store.setProvider();

      const provider = await store.provider;

      // Zoro provider does't have `fetchTopAiring` chain method
      if (typeof provider.fetchTopAiring === "undefined") {
        provider.fetchTopAiring = fetchTopAiring;
      }

      provider
        .fetchTopAiring()
        .then((response: ApiResponse) => {
          this.data = response;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});

const RESOLUTIONS = ["360p", "480p", "720p", "1080p"];

interface SourceState {
  loading: boolean;
  data: ISource[];
}

export const useEpisodeSource = defineStore("useEpisodeSource", {
  state: (): SourceState => ({
    loading: true,
    data: [],
  }),
  getters: {
    sources: (state) => {
      return state.data?.sources
        ?.map((item) => {
          const regex = new RegExp(`(${RESOLUTIONS.join("|")})`);
          const match = regex.exec(item.quality);
          if (match?.length) {
            return {
              ...item,
              quality: Number(match[0].substring(0, match[0].length - 1)),
            };
          }
        })
        .filter((item) => typeof item !== "undefined");
    },
  },
  actions: {
    async fetch(episodeId: string) {
      this.loading = true;

      const store = useAnimeProvider();
      store.setProvider();

      const provider = await store.provider;

      provider
        .fetchEpisodeSources(episodeId)
        .then((response) => {
          this.data = response;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
