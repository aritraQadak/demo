import http from 'http';
import { handleAuthRequest } from './authHandler.js';

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  // Set CORS headers for standalone development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.url && req.url.startsWith('/api/auth')) {
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
