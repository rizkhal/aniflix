import {
  app,
  BrowserWindow,
  ipcMain,
  OnHeadersReceivedListenerDetails,
  session,
  Menu,
  MenuItem,
} from "electron";
import { join } from "path";

function createWindow() {
  const mainWindow = new BrowserWindow({
    show: false,
    icon: join(__dirname, "./static/aniflix512.png"),
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: false,
    },
  });

  mainWindow.maximize();
  mainWindow.show();

  const menu = new Menu();
  menu.append(
    new MenuItem({
      label: "Electron",
      submenu: [
        {
          role: "help",
          accelerator:
            process.platform === "darwin" ? "Alt+Cmd+I" : "Alt+Shift+I",
          click: () => {
            console.log("Electron rocks!");
          },
        },
      ],
    })
  );

  // Menu.setApplicationMenu(menu);

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

ipcMain.on("message", (event, message) => {
  console.log(message);
});
