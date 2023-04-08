import routes from "./routes";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const authRequired = !["/"].includes(to.path);
  const loggedIn = localStorage.getItem("token");

  if (authRequired && !loggedIn) {
    next("/");
  } else if (loggedIn && to.name === "login") {
    next("/home");
  } else {
    next();
  }
});

export default router;
