import { App } from "vue";
import { ModuleNamespace } from "vite/types/hot";

/**
 * Register layouts in the app instance
 *
 * @param {App<Element>} app
 */
export default (app: App<Element>) => {
  const layouts = import.meta.glob<ModuleNamespace>("../layouts/*.vue", {
    eager: true,
  });

  Object.entries(layouts).forEach(([, layout]) => {
    app.component(layout?.default?.name, layout?.default);
  });
};
