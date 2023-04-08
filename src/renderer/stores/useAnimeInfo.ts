import { defineStore } from "pinia";
import f from "../utils/api";
import type { AnimeInfo } from "../typings";

export const useAnimeInfo = defineStore("animeInfo", {
  state: (): AnimeInfo => ({
    info: null,
    animeId: null,
    loading: true,
  }),
  actions: {
    async fetch(animeId: string | string[]): Promise<void> {
      this.loading = true;

      f(`/api/samehadaku/info/${animeId}`)
        .get()
        .json(({ data }) => {
          this.info = data;
          this.animeId = animeId;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
