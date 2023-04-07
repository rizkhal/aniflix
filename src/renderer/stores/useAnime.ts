import { defineStore } from "pinia";
import f from "../utils/api";
import { WatchAnimeItem } from "../typings";

type Video = {
  url: string;
  type: string;
  resolution: string;
};

export const useAnime = defineStore("anime", {
  state: () => ({
    loading: true,
    data: [],
    info: null,
    latest: [],
    videos: [],
    animeId: null,
    hasMorePages: true,
  }),
  actions: {
    async fetchOnGoing(): Promise<void> {
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
    async fetchLatest(page: number = 1) {
      this.loading = true;
      f(`/api/samehadaku/latest?page=${page}`)
        .get()
        .json(({ hasMorePages, data }) => {
          const dataMaped = data.map((item: WatchAnimeItem) => {
            const match = item.episodeId.match(/(.+)-episode-\d+/);
            return {
              ...item,
              animeId: match ? match[1] : null,
            };
          });

          this.latest = dataMaped;
          this.hasMorePages = hasMorePages;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async fetchInfo(animeId: string | string[]): Promise<void> {
      this.loading = true;
      f(`/api/samehadaku/info/${animeId}`)
        .get()
        .json(({ data }) => {
          this.info = data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async fetchWatch(episodeId: string | string[]) {
      this.loading = true;
      f(`/api/samehadaku/watch/1/${episodeId}`)
        .get()
        .json(({ animeId, videos }) => {
          const f = videos.filter((i: Video) => i?.type === "mp4");
          this.animeId = animeId;
          this.videos = f;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
