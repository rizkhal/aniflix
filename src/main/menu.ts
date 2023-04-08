import { Menu, MenuItem, MenuItemConstructorOptions, shell } from "electron";

export default function () {
  const template: Array<MenuItemConstructorOptions | MenuItem> = [
    {
      label: "Reload",
      submenu: [{ role: "reload" }, { role: "forceReload" }],
    },
    {
      label: "View",
      submenu: [
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { role: "quit" },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Support",
          click: () => {
            shell.openExternal("https://github.com/sponsors/rizkhal");
          },
        },
        {
          label: "Contact",
          click: () => {
            shell.openExternal("https://t.me/rizkhal");
          },
        },
      ],
    },
  ];

  let menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
}
