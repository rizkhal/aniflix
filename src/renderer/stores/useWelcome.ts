import { defineStore } from "pinia";

export const useWelcome = defineStore("welcome", {
  state: () => ({
    isShow: false,
  }),
  actions: {
    show(show: boolean) {
      this.isShow = show;
    },
  },
});
