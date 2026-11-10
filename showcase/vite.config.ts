import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5000, open: false },
  preview: { port: 5000 },
  build: {
    rollupOptions: {
      output: {
        // Long-lived vendor chunks, plus one chunk for the raw snippet sources shown in the Code tab.
        manualChunks(id) {
          if (id.includes("?raw")) return "snippets";
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return "react";
          if (id.includes("node_modules/framer-motion") || id.includes("node_modules/motion-")) return "motion";
          if (id.includes("node_modules/prism-react-renderer")) return "prism";
          if (id.includes("node_modules/lucide-react")) return "icons";
        },
      },
    },
  },
});
