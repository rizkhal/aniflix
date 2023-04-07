import type { RouteLocationRaw } from "vue-router";

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
  info: Info | null;
};

export type WatchAnimeItem = {
  title: string;
  animeId: string | null;
  thumbnail: string;
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

export type ProviderFormated = {
  value: string;
  label: string;
};

export interface MenuItem {
  [key: number]: { label: string; icon: string; route: RouteLocationRaw };
}

export type AnilistFeed = { url: string; title: string; poster: string };

export type AnimeItem = {
  id: string;
  title: string;
  url: string;
  cover: string;
  score: string;
  type: string;
  status: string;
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
