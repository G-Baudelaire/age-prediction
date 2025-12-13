import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/age-and-gender-prediction/",
  build: {
    outDir: "docs",
  },
});
