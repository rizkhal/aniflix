import {
  app,
  ipcMain,
  session,
  nativeTheme,
  BrowserWindow,
  globalShortcut,
} from "electron";
import { join } from "path";
import setApplicationMenu from "./menu";

import Store, { Schema } from "electron-store";

interface MySchema {
  setting: {
    proxy: string;
  };
}

const schema: Schema<MySchema> = {
  setting: {
    type: "object",
    properties: {
      proxy: {
        type: "string",
        default: "",
      },
    },
  },
};

const store = new Store<MySchema>({ schema });

function createWindow() {
  const mainWindow = new BrowserWindow({
    show: false,
    icon: join(__dirname, "./static/icon.png"),
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
    },
  });

  mainWindow.maximize();
  mainWindow.show();

  // setApplicationMenu();

  globalShortcut.register("Ctrl+\\", () => {
    mainWindow.webContents.send("toggle-sidebar");
  });

  ipcMain.handle("dark-mode:toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
    } else {
      nativeTheme.themeSource = "dark";
    }
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle("dark-mode:system", () => {
    nativeTheme.themeSource = "system";
  });

  ipcMain.handle("dark-mode:dark", () => {
    nativeTheme.themeSource = "dark";
  });

  ipcMain.handle("dark-mode:light", () => {
    nativeTheme.themeSource = "light";
  });

  if (process.env.NODE_ENV === "development") {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(join(app.getAppPath(), "renderer", "index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();
});

app.on("ready", function () {
  session.defaultSession.allowNTLMCredentialsForDomains("*");

  ipcMain.handle("get:proxy", () => {
    const proxy: string = store.get("proxy");

    if (proxy.length > 0) {
      const proxyConfig = {
        proxyRules: proxy,
        proxyBypassOnLocal: false,
      };

      session.defaultSession.setProxy(proxyConfig);
    }

    return proxy;
  });

  ipcMain.handle("set:proxy", (event, state) => {
    store.set("proxy", state);
  });
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

ipcMain.on("message", (event, message) => {
  console.log(message);
});
