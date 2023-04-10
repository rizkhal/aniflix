import { VNode } from "vue";

const store: any = {};

export function setInstance(id: string, proxy: VNode) {
  store[id] = proxy;
}

export function getInstance(id: string) {
  return store[id];
}
