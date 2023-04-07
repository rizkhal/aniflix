import { defineStore } from "pinia";
import f from "../utils/api";

export const useAnimeRecomendation = defineStore("animeRecomendation", {
  state: () => ({
    loading: true,
    data: [],
  }),
  actions: {
    async fetch(): Promise<void> {
      this.loading = true;
      f(`/api/samehadaku/recomendation`)
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
