import { App } from "vue";
import { ModuleNamespace } from "vite/types/hot";

/**
 * Register layouts in the app instance
 *
 * @param {App<Element>} app
 */
export default {
  install(app: App<Element>) {
    const components = import.meta.glob<ModuleNamespace>("./**/*.vue", {
      eager: true,
    });

    Object.entries(components).forEach(([, component]) => {
      app.component(component?.default?.name, component?.default);
    });
  },
};
