import { defineConfig } from "vite";
import { resolve } from 'path'

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        quiz: resolve(__dirname, 'quiz.html'),
      },
    },
    minify: "terser"
  }
})