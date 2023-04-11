import { defineStore } from "pinia";
import { useAnimeProvider, ISource } from "./useAnimeProvider";

const RESOLUTIONS = ["360p", "480p", "720p", "1080p"];

interface SourceState {
  loading: boolean;
  data: Array<ISource>;
}

export const useEpisodeSource = defineStore("useEpisodeSource", {
  state: (): SourceState => ({
    loading: true,
    data: [],
  }),
  getters: {
    sources: (state) => {
      return state.data?.sources?.map((item) => {
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
