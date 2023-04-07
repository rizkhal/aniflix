import { defineStore } from "pinia";
import f from "../utils/api";
import type { AnimeItem } from "../typings";

type Search = {
  loading: boolean;
  data: Array<AnimeItem>;
};

export const useSearch = defineStore("search", {
  state: (): Search => ({
    loading: false,
    data: [],
  }),
  actions: {
    async execute(query: string | string[]): Promise<void> {
      this.loading = true;

      f(`/api/samehadaku/search?q=${query}`)
        .get()
        .json(({ data }) => {
          this.data = data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
