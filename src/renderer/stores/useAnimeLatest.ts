import { defineStore } from "pinia";
import f from "../utils/api";
import { WatchAnimeItem } from "../typings";

type AnimeLatestStore = {
  loading: boolean;
  hasMorePages: boolean;
  data: Array<WatchAnimeItem>;
};

export const useAnimeLatest = defineStore("animeLatest", {
  state: (): AnimeLatestStore => ({
    data: [],
    loading: true,
    hasMorePages: true,
  }),
  actions: {
    fetch(page: number = 1) {
      this.loading = true;
      f(`/api/samehadaku/latest?page=${page}`)
        .get()
        .json(({ hasMorePages, data }) => {
          this.data = data;
          this.hasMorePages = hasMorePages;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
