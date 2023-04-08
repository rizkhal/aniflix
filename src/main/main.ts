import {
  app,
  BrowserWindow,
  ipcMain,
  OnHeadersReceivedListenerDetails,
  session,
} from "electron";
import { join } from "path";
import setApplicationMenu from "./menu";

function createWindow() {
  const mainWindow = new BrowserWindow({
    show: false,
    icon: join(__dirname, "./static/icon.png"),
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: false,
    },
  });

  mainWindow.maximize();
  mainWindow.show();

  setApplicationMenu();

  if (process.env.NODE_ENV === "development") {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(join(app.getAppPath(), "renderer", "index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  session.defaultSession.webRequest.onHeadersReceived(
    (details: OnHeadersReceivedListenerDetails, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          // "Content-Security-Policy": ["script-src 'self'"],
        },
      });
    }
  );

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
