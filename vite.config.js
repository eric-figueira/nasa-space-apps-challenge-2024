import { defineConfig } from "vite";

export default defineConfig({
  base: "./pages/index.html",
  build: {
    minify: "terser",
  }
})