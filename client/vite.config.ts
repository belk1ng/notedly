import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    svgr({
      include: "**/*.svg?react",
    }),
    react(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".json", ".js"],
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
