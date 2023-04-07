import { defineStore } from "pinia";
import { fAsync } from "../utils/api";
import type { AvailableAnimeServer } from "../typings";

type AnimeServerLists = {
  loading: boolean;
  data: {
    [key: number]: AvailableAnimeServer;
  };
};

export const useServer = defineStore("server", {
  state: (): AnimeServerLists => ({
    loading: true,
    data: [],
  }),
  actions: {
    async fetch() {
      return (await fAsync(`/api/samehadaku/servers`))
        .get()
        .json((data) => data);
    },
  },
});
