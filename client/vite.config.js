import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Your desired port for the development server
    proxy: {
      // Proxying API requests to avoid CORS issues during development
      "/api": {
        target: "http://localhost:3001", // Target server for your API
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      target: "http://127.0.0.1:3001",
    },
  },
});
