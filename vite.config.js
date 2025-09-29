

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://full-stack-backend-5-dm0x.onrender.com",
        changeOrigin: true, // ✅ Fixes host header issues
        secure: true,       // ✅ Ensures HTTPS is respected
        rewrite: (path) => path.replace(/^\/api/, ""), // ⬅️ Add this line
      },
    },
  },
});
