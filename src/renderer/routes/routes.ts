const routes = [
  {
    name: "login",
    path: "/",
    meta: {
      title: "Login",
      layout: "GuestLayout",
    },
    component: () => import("../screens/Login.vue"),
  },
  {
    name: "home",
    path: "/home",
    meta: {
      title: "Beranda",
    },
    component: () => import("../screens/Home.vue"),
  },
  {
    name: "latest",
    path: "/latest/:page?",
    meta: {
      title: "Semua Anime Baru Diupload",
      backButton: true,
    },
    component: () => import("../screens/Latest.vue"),
  },
  {
    path: "/detail",
    meta: {
      backButton: true,
    },
    children: [
      {
        name: "detail",
        path: "/:animeId",
        component: () => import("../screens/Detail.vue"),
      },
    ],
  },
  {
    name: "watch",
    path: "/detail/watch/:episodeId",
    meta: { backButton: true },
    component: () => import("../screens/Watch.vue"),
  },
  {
    name: "bookmark",
    path: "/bookmark",
    meta: {
      title: "Favorit",
    },
    component: () => import("../screens/Bookmark.vue"),
  },
  {
    name: "setting",
    path: "/setting",
    meta: {
      title: "Pengaturan",
      rightBar: false,
    },
    component: () => import("../screens/Setting.vue"),
  },
];

export default routes;
