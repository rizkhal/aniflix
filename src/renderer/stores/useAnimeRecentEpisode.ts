import { defineStore } from "pinia";
import type { TopAiring } from "../typings";
import { useAnimeProvider, IAnimeResult, ISearch } from "./useAnimeProvider";

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
          console.log(response);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
