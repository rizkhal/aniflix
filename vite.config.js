const Path = require("path");
const vuePlugin = require("@vitejs/plugin-vue");
import viteExtend from "vite-plugin-vue-setup-extend";
const { defineConfig } = require("vite");
import envCompatible from "vite-plugin-env-compatible";
import svgLoader from "vite-svg-loader";

/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
  root: Path.join(__dirname, "src", "renderer"),
  publicDir: "public",
  server: {
    port: 9999,
  },
  open: false,
  build: {
    outDir: Path.join(__dirname, "build", "renderer"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  plugins: [svgLoader(), vuePlugin(), viteExtend(), envCompatible()],
});

module.exports = config;
