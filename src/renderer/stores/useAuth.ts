import f from "wretch";
import { defineStore } from "pinia";
import { LoginCredentials } from "../typings";

const BASE_URL = import.meta.env.VITE_ANIFLIX_API_URL;

type Login = {
  errors?: string;
  loading: boolean;
};

export const useAuth = defineStore("auth", {
  state: (): Login => ({
    errors: undefined,
    loading: false,
  }),
  getters: {
    isAuth: (state) => {
      const token = localStorage.getItem("token");

      return token ? JSON.parse(token) : false;
    },
  },
  actions: {
    async login(model: LoginCredentials): Promise<void> {
      this.loading = true;
      return f(`${BASE_URL}/api/auth/login`)
        .post(model)
        .badRequest((err) => {
          const { message } = JSON.parse(err.message);
          this.errors = message;
        })
        .json(({ user, token }) => {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", JSON.stringify(token));
        });
    },
  },
});
