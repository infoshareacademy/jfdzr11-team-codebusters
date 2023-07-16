import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/jfdzr11-team-codebusters/",
  build: {
    chunkSizeWarningLimit: 1600,
    outDir: "build",
  },
});
