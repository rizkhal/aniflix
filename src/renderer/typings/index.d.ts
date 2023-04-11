import {
  IAnimeInfo,
  IAnimeResult,
  ISearch,
  ISource,
  StreamingServers,
} from "@consumet/extensions";
import { Ref } from "vue";
import type { RouteLocationRaw } from "vue-router";

export type TopAiring = {
  currentPagge: number;
  hasMorePage: boolean;
  results: Array<AnimeItem>;
};

export type AvailableAnimeServer = {
  id: number;
  name: string;
};

export type VideoStreamingSource = {
  src?: string;
  type: string;
  server?: string;
};

export type Rating = {
  ratingValue: string;
  ratingCount: string;
};

export type Episode = {
  episodeId: string;
  link: string;
  text: string;
  date: string;
};

export type Info = {
  title: string;
  image: string;
  genre: Array<[]>;
  rating: Rating;
  description: string;
  details: object;
  thrailer: string;
  episodes: Array<Episode>;
};

export type AnimeInfo = {
  loading: boolean;
  animeId: string | string[] | null;
  info: Info | null;
};

export type WatchAnimeItem = {
  title: string;
  animeId: string | null;
  image: string;
  episodeId: string;
  episode: string;
  author: string;
  release: string;
};

export interface LoginCredentials {
  username: string;
  password: string;
}

export type Provider = {
  id: string;
  name: string;
};

export { ISearch, ISource, IAnimeInfo, IAnimeResult };

export type ProviderType = "Gogoanime" | "Zoro";

export interface ProviderState {
  provider: Promise<AnimeProvider>;
}

export type ProviderRef<T extends ProviderType> = Omit<Ref<T>, "value"> & {
  get value(): T;
  set value(value: T | ProviderType);
};

export interface AnimeProvider {
  fetchTopAiring: () => Promise<ISearch<IAnimeResult>>;
  fetchRecentEpisodes: () => Promise<ISearch<IAnimeResult>>;
  fetchAnimeInfo: (id: string) => Promise<IAnimeInfo>;
  fetchEpisodeSources: (
    episodeId: string,
    server?: StreamingServers
  ) => Promise<ISource>;
}

export type ProviderFormated = {
  value: string;
  label: string;
};

export interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

export interface MenuItemList {
  [key: number]: MenuItem;
}

export type AnilistFeed = { url: string; title: string; poster: string };

export type AnimeItem = {
  id: string;
  title: string;
  url: string;
  image: string;
  score: string;
  type: string;
  status: string;
  episodeId?: string;
  animeId: string;
};

export type GogoAnimeWatchItem = AnimeItem & {
  animeId: string;
  episodeId: string;
};

export type GogoanimeApiResult = {
  currentPage: number;
  hasNextPage: boolean;
  results: Array<never>;
};
