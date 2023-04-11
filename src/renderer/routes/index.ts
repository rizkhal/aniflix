import routes from "./routes";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export const authRequiredRoutes = ["/bookmark"];

router.beforeEach((to, from, next) => {
  const requireAuthScreen = authRequiredRoutes.includes(to.path);

  if (requireAuthScreen) {
    next(from.path);
  } else {
    next();
  }

  // const authRequired = !["/"].includes(to.path);
  // const loggedIn = localStorage.getItem("token");

  // if (authRequired && !loggedIn) {
  //   next("/");
  // } else if (loggedIn && to.name === "login") {
  //   next("/home");
  // } else {
  // next();
  // }
});

export default router;
