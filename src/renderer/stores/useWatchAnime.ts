import { defineStore } from "pinia";
import f from "../utils/api";
import { useAnimeInfo } from "./useAnimeInfo";

type Video = {
  url: string;
  type: string;
  poster?: string;
  resolution: string;
};

type ApiResponse = {
  supportedServer: Array<[]>;
  availableServer: Array<[]>;
  videos: Array<Video>;
};

type Watch = ApiResponse & {
  animeId: string;
};

type WatchLists = ApiResponse & {
  loading: boolean;
};

export const useWatchAnime = defineStore("watchAnime", {
  state: (): WatchLists => ({
    loading: true,
    videos: [],
    supportedServer: [],
    availableServer: [],
  }),
  getters: {
    filteredAvaillableServer: (state: WatchLists) => {
      return state.availableServer.filter((item) =>
        state.supportedServer.includes(item)
      );
    },
    videosMP4: (state: WatchLists) => {
      return state.videos.filter((item: Video) => item?.type === "mp4");
    },
  },
  actions: {
    async fetch(episodeId: string | string[], server?: string | string[]) {
      this.loading = true;
      const animexInfoStore = useAnimeInfo();

      f(`/api/samehadaku/watch/${server}/${episodeId}`)
        .get()
        .json(
          ({ animeId, videos, availableServer, supportedServer }: Watch) => {
            console.log(videos);

            this.videos = videos;
            this.supportedServer = supportedServer;
            this.availableServer = availableServer;

            animexInfoStore.fetch(animeId);
          }
        )
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
