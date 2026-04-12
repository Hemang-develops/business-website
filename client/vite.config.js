import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'
import fs from 'fs'
import path from 'path'

const apiPlugin = () => ({
  name: 'api-plugin',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      console.log('Middleware hit for URL:', req.url);
      if (req.url.startsWith('/api/')) {
        try {
          const urlPath = req.url.split('?')[0];
          // Determine the path to the api file inside client/api.
          // Remove leading slash so path.join doesn't resolve to C:\ root on Windows
          const cleanPath = urlPath.replace(/^\/+/, '');
          const filePath = path.join(process.cwd(), cleanPath + '.js');
          
          console.log('Computed filePath:', filePath);
          const exists = fs.existsSync(filePath);
          console.log('File exists:', exists);

          if (exists) {
            let modulePath = `file://${filePath}`;
            if (process.platform === 'win32') {
              modulePath = `file:///${filePath.replace(/\\/g, '/')}`;
            }
            console.log('Module path:', modulePath);
            const module = await import(modulePath);
            const handler = module.default || module;
            console.log('Handler found, applying Vercel mock...');

            // Mock Vercel res methods
            res.status = (code) => {
              res.statusCode = code;
              return res;
            };
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            };

            console.log('Executing handler');
            return await handler(req, res);
          } else {
            console.log('Returning 404');
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "API route not found" }));
          }
        } catch (error) {
          console.error("API Error: ", error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "Internal Server Error", details: error.message }));
        }
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiPlugin()],
})
