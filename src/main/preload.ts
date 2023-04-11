import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("sidebar", {
  toggle: (cb) => ipcRenderer.on("open-sidebar", cb),
});

// ipcRenderer.on("open-sidebar", () => {
//   console.log("dwndwkj");
// });

contextBridge.exposeInMainWorld("electronAPI", {
  sendMessage: (message: string) => ipcRenderer.send("message", message),
});

contextBridge.exposeInMainWorld("darkMode", {
  system: () => ipcRenderer.invoke("dark-mode:system"),
  dark: () => ipcRenderer.invoke("dark-mode:dark"),
  light: () => ipcRenderer.invoke("dark-mode:light"),
  toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
});
