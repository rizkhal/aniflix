/// <reference types="vite/client" />
/// <reference path="vite.d.ts" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<{}, {}, any>;
  export default component;
}
interface ImportMetaEnv {
  readonly VITE_ANIFLIX_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
