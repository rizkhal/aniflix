import { defineStore } from "pinia";
import type { TopAiring } from "../typings";
import { fetchTopAiring } from "../scripts/zoro";
import { useAnimeProvider, IAnimeResult, ISearch } from "./useAnimeProvider";

type ApiResponse = ISearch<IAnimeResult | TopAiring> | null;

type State = {
  loading: boolean;
  data: ApiResponse;
};

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
