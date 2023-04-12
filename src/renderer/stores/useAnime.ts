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
import { ANIME, IVideo } from "@consumet/extensions";

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
  error: any;
  loading: boolean;
  data: IAnimeInfo | null;
}

export const useAnimeInfo = defineStore("useAnimeInfo", {
  state: (): EpisodeState => ({
    data: null,
    error: null,
    loading: true,
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
          this.error = null;
          this.data = response;
        })
        .catch((error) => {
          window.logger.sendMessage(error);

          if (error.message.includes("Network Error")) {
            this.error = "Network Error, check your connection or use proxy";
          } else {
            this.error = error.message;
          }
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
  error: null;
  data: ApiResponse;
};

export const useAnimeRecentEpisode = defineStore("useAnimeRecentEpisode", {
  state: (): State => ({
    data: null,
    error: null,
    loading: true,
  }),
  actions: {
    async fetch(page: number = 1) {
      this.loading = true;

      const store = useAnimeProvider();
      store.setProvider();

      const provider = await store.provider;

      provider
        .fetchRecentEpisodes(page)
        .then((response: ApiResponse) => {
          this.data = response;
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});

export const useAnimeTopAiring = defineStore("useAnimeTopAiring", {
  state: (): State => ({
    data: null,
    error: null,
    loading: true,
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

type MyIVideo = {
  url: string;
  quality: number;
};

interface SourceState {
  loading: boolean;
  data: IVideo[];
}

export const useEpisodeSource = defineStore("useEpisodeSource", {
  state: (): SourceState => ({
    loading: true,
    data: [],
  }),
  getters: {
    sources: (state) => {
      return state.data
        .map((item: IVideo) => {
          const regex = new RegExp(`(${RESOLUTIONS.join("|")})`);
          if (item.quality) {
            const match = regex.exec(item.quality);
            if (match?.length) {
              return {
                ...item,
                quality: Number(match[0].substring(0, match[0].length - 1)),
              };
            }
          }

          return item;
        })
        .filter((item) => typeof item !== "undefined");
    },
  },
  actions: {
    async fetch(episodeId: string | string[]) {
      this.loading = true;

      const store = useAnimeProvider();
      store.setProvider();

      const provider = await store.provider;

      provider
        .fetchEpisodeSources(episodeId)
        .then(({ sources }) => {
          this.data = sources;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
