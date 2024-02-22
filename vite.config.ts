import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import requireTransform from "vite-plugin-require-transform";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), requireTransform()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
