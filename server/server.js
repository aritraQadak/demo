import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleAuthRequest } from './authHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  // Set CORS headers for standalone development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Handle static uploads (e.g. /uploads/avatars/...)
  if (req.url && req.url.startsWith('/uploads/')) {
    const cleanUrl = req.url.split('?')[0];
    const filePath = path.join(PUBLIC_DIR, cleanUrl);

    // Prevent path traversal
    if (!filePath.startsWith(PUBLIC_DIR)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.webp': 'image/webp'
      };
      res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
      res.statusCode = 200;
      fs.createReadStream(filePath).pipe(res);
      return;
    } else {
      res.statusCode = 404;
      res.end('File not found');
      return;
    }
  }

  // Route API requests
  if (req.url && (req.url.startsWith('/api/auth') || req.url.startsWith('/api/profile') || req.url.startsWith('/api/upload'))) {
    await handleAuthRequest(req, res);
    return;
  }

  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`Karigar Auth API Server running on port ${PORT}`);
});
