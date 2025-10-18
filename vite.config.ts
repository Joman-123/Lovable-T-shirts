import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Vite config
// - Destructure command and mode for future extensibility (build vs dev).
// - Use a clear isDev flag and conditional plugin inclusion.
// - Bind server to IPv6 '::' by default; see notes below if you need 0.0.0.0 (Windows/containers).
export default defineConfig(({ command, mode }) => {
  const isDev = mode === "development";

  return {
    server: {
      // '::' listens on all IPv6 and IPv4 (on supporting OS). If you run into
      // issues on Windows or some container setups, change to '0.0.0.0' or `host: true`.
      host: "::",
      port: 8080,
      // Fail if the port is already in use (helps detect port conflicts early).
      strictPort: true,
    },

    plugins: [
      react(),
      // include componentTagger only during development for faster builds in production
      ...(isDev ? [componentTagger()] : []),
    ],

    resolve: {
      alias: {
        // '@' -> /src
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
