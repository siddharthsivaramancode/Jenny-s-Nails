import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" so a built dist/ works from any path (Netlify Drop, a subfolder, etc.)
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: { port: 5195, strictPort: false },
});
