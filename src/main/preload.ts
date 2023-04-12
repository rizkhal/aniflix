import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("setting", {
  toggle: (cb) => ipcRenderer.on("toggle-sidebar", cb),
  getProxy: () => ipcRenderer.invoke("get:proxy"),
  setProxy: (proxy) => ipcRenderer.invoke("set:proxy", proxy),
});

contextBridge.exposeInMainWorld("logger", {
  sendMessage: (message: string) => ipcRenderer.send("message", message),
});

contextBridge.exposeInMainWorld("darkMode", {
  system: () => ipcRenderer.invoke("dark-mode:system"),
  dark: () => ipcRenderer.invoke("dark-mode:dark"),
  light: () => ipcRenderer.invoke("dark-mode:light"),
  toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
});
