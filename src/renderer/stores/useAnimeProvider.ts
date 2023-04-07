import f from "wretch";
import { defineStore } from "pinia";
import { ucfirst } from "../utils";
import type { Provider } from "../typings/index";

const API_URL = import.meta.env.VITE_ANIFLIX_API_URL;

let token = "";
if (localStorage.getItem("token")) {
  token = JSON.parse(localStorage.getItem("token") || "");
}

const headers = {
  Authorization: `Bearer ${token?.accessToken}`,
};

export const useAnimeProvider = defineStore("animeProvider", {
  state: () => ({
    loading: true,
    data: [],
  }),
  actions: {
    fetch() {
      f(`${API_URL}/api/providers`)
        .headers(headers)
        .get()
        .json(({ data }) => {
          this.data = data.map((item: Provider) => {
            return {
              value: item.id,
              label: ucfirst(item.name),
            };
          });
        });
    },
    async update(providerId: number) {
      f(`${API_URL}/api/set/provider`)
        .headers(headers)
        .post({
          providerId: providerId,
        })
        .json(({ user, message }) => {
          localStorage.setItem("user", JSON.stringify(user));
        });
    },
  },
});
