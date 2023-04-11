import { VNode } from "vue";

const store: any = {};

export function hasInstance() {
  return Object.values(store).length;
}

export function setInstance(id: string, proxy: any) {
  if (proxy) {
    store[id] = proxy;
  }
}

export function getInstance(id: string) {
  return store[id];
}

export function removeInstance(id: string) {
  delete store[id];
}
