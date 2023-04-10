import { defineStore } from "pinia";
import { useAnimeProvider, IAnimeResult, ISearch } from "./useAnimeProvider";
import { IAnimeInfo } from "@consumet/extensions";

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
