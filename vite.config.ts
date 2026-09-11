import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  // Base relativa: el build funciona en GitHub Pages, Netlify, Vercel
  // o cualquier sub-ruta sin necesidad de reconfigurar.
  base: "./",
  plugins: [react(), tailwindcss(), viteSingleFile()],
  server: {
    host: true,
    // Permite abrir el dev server desde vistas previas con proxy
    // (Codespaces, StackBlitz, sandboxes, móvil en red local, etc.)
    allowedHosts: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
