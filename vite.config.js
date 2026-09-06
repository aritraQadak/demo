import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { handleAuthRequest } from './server/authHandler.js'

function karigarAuthPlugin() {
  return {
    name: 'karigar-auth-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/auth')) {
          await handleAuthRequest(req, res);
          return;
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/auth')) {
          await handleAuthRequest(req, res);
          return;
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    karigarAuthPlugin()
  ],
})
