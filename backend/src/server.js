const fs = require('fs');
const path = require('path');
const http = require('http');
const { env } = require('./config/env');
const { text } = require('./utils/http');
const { createDb } = require('./db/database');
const { buildSlotsService } = require('./services/slots.service');
const { buildNewsletterService } = require('./services/newsletter.service');
const { buildCmsService } = require('./services/cms.service');
const { buildOrdersService } = require('./services/orders.service');
const { buildAuthService } = require('./services/auth.service');
const { createApiRouter } = require('./routes/api');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function staticCacheHeader(ext) {
  if (ext === '.html') return 'no-cache';
  if (ext === '.css' || ext === '.js') return 'public, max-age=300, stale-while-revalidate=86400';
  if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.ico'].includes(ext)) {
    return 'public, max-age=604800, stale-while-revalidate=86400';
  }
  return 'public, max-age=3600, stale-while-revalidate=86400';
}

function safeFilePath(root, pathname) {
  const requested = pathname === '/' ? '/index.html' : pathname;
  const decoded = decodeURIComponent(requested);
  const absolute = path.resolve(root, '.' + decoded);
  if (!absolute.startsWith(root)) return null;
  return absolute;
}

function serveStatic(req, res, pathname) {
  const fullPath = safeFilePath(env.staticDir, pathname);
  if (!fullPath) return text(res, 403, 'Forbidden');

  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) {
      return text(res, 404, 'Not found');
    }

    const ext = path.extname(fullPath).toLowerCase();
    const etag = `W/"${stats.size}-${Math.floor(stats.mtimeMs)}"`;
    if (req.headers['if-none-match'] === etag) {
      res.writeHead(304, {
        ETag: etag,
        'Cache-Control': staticCacheHeader(ext),
        'Last-Modified': stats.mtime.toUTCString()
      });
      return res.end();
    }

    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Content-Length': stats.size,
      'Cache-Control': staticCacheHeader(ext),
      ETag: etag,
      'Last-Modified': stats.mtime.toUTCString()
    });
    fs.createReadStream(fullPath).pipe(res);
  });
}

async function createServer() {
  const db = await createDb();
  const slotsService = buildSlotsService(db, env);
  const newsletterService = buildNewsletterService(db);
  const cmsService = buildCmsService(db, env);
  const ordersService = buildOrdersService(db);
  const authService = buildAuthService(env);
  const apiRouter = createApiRouter({ slotsService, newsletterService, cmsService, ordersService, authService, env });

  return http.createServer(async (req, res) => {
    const host = req.headers.host || `localhost:${env.port}`;
    const url = new URL(req.url || '/', `http://${host}`);

    if (url.pathname.startsWith('/api/')) {
      return apiRouter(req, res, url);
    }

    if (url.pathname === '/admin') {
      return serveStatic(req, res, '/admin/index.html');
    }

    if (url.pathname === '/admin/login') {
      return serveStatic(req, res, '/admin/login.html');
    }

    return serveStatic(req, res, url.pathname);
  });
}

if (require.main === module) {
  createServer()
    .then((server) => {
      server.listen(env.port, () => {
        console.log(`Monocle backend running on http://localhost:${env.port}`);
        console.log(`DB client: ${env.dbClient}`);
        if (env.dbClient === 'sqlite') {
          console.log(`DB: ${env.dbPath}`);
        } else {
          console.log('DB: postgres');
        }
      });
    })
    .catch((error) => {
      console.error('[Monocle] startup failed:', error && error.message ? error.message : String(error));
      process.exit(1);
    });
}

module.exports = { createServer };
