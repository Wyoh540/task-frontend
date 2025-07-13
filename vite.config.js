import path from "path"
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import monacoEditorEsmPlugin from "vite-plugin-monaco-editor-esm";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monacoEditorEsmPlugin(),  // monacoEditor 插件，不使用CDN资源
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
