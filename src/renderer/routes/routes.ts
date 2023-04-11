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
      title: "Home",
    },
    component: () => import("../screens/Home.vue"),
  },
  {
    name: "latest",
    path: "/latest/:page?",
    meta: {
      title: "Recents",
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
    path: "/detail/:animeId/:episodeId",
    meta: { backButton: true },
    component: () => import("../screens/Watch.vue"),
  },
  {
    name: "bookmark",
    path: "/bookmark",
    meta: {
      title: "Watch List",
    },
    component: () => import("../screens/Bookmark.vue"),
  },
  {
    name: "setting",
    path: "/setting",
    meta: {
      title: "Setting",
      rightBar: false,
    },
    component: () => import("../screens/Setting.vue"),
  },
];

export default routes;
