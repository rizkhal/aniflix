import { defineStore } from "pinia";
import { useAnimeProvider, IAnimeInfo } from "./useAnimeProvider";

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
