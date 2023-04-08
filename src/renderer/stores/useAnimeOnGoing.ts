import { defineStore } from "pinia";
import f from "../utils/api";
import { AnimeItem } from "../typings";

type AnimeOngoing = {
  data: Array<AnimeItem>;
  loading: boolean;
};

export const useAnimeOnGoing = defineStore("animeOngoing", {
  state: (): AnimeOngoing => ({
    loading: true,
    data: [],
  }),
  actions: {
    fetch(): void {
      this.loading = true;
      f("/api/samehadaku/ongoing")
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
