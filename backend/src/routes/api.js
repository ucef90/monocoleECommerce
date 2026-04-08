const { json, parseJsonBody } = require('../utils/http');
const { parseCookies, setCookie, clearCookie } = require('../utils/cookies');

function toCsv(rows) {
  const header = ['id', 'email', 'source', 'discount_code', 'created_at'];
  const escape = (value) => {
    const s = String(value ?? '');
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replaceAll('"', '""')}"`;
    }
    return s;
  };
  const lines = [header.join(',')];
  rows.forEach((row) => {
    lines.push([
      row.id,
      row.email,
      row.source,
      row.discount_code,
      row.created_at
    ].map(escape).join(','));
  });
  return lines.join('\n');
}

function createApiRouter({ slotsService, newsletterService, cmsService, authService, env }) {
  function parseIdFromPath(pathname, prefix) {
    if (!pathname.startsWith(prefix)) return null;
    const value = pathname.slice(prefix.length);
    const id = Number(value);
    if (!Number.isInteger(id) || id <= 0) return null;
    return id;
  }

  function parseKeyFromPath(pathname, prefix) {
    if (!pathname.startsWith(prefix)) return null;
    const value = decodeURIComponent(pathname.slice(prefix.length));
    if (!value) return null;
    return value;
  }

  function requireAdmin(req, res) {
    const cookies = parseCookies(req);
    const token = cookies[authService.cookieName];
    const session = authService.verifyToken(token);
    if (!session) {
      json(res, 401, { error: 'unauthorized' });
      return null;
    }
    return session;
  }

  return async function handleApi(req, res, url) {
    try {
      if (req.method === 'GET' && url.pathname === '/api/health') {
        return json(res, 200, {
          ok: true,
          service: 'monocle-api',
          dbClient: env.dbClient,
          time: new Date().toISOString()
        });
      }

      if (req.method === 'GET' && url.pathname === '/api/slots') {
        const slots = await slotsService.getSlots();
        return json(res, 200, slots);
      }

      if (req.method === 'POST' && url.pathname === '/api/slots/reserve') {
        try {
          const body = await parseJsonBody(req);
          const reserved = await slotsService.reserve(body.qty);
          return json(res, 200, reserved);
        } catch (error) {
          if (error.message === 'payload_too_large') return json(res, 413, { error: 'payload_too_large' });
          if (error.message === 'invalid_json') return json(res, 400, { error: 'invalid_json' });
          return json(res, 500, { error: 'reserve_failed' });
        }
      }

      if (req.method === 'POST' && url.pathname === '/api/newsletter/subscribe') {
        try {
          const body = await parseJsonBody(req);
          const result = await newsletterService.subscribe(body);
          if (!result.ok) return json(res, result.code, { error: result.error });
          return json(res, result.code, result.data);
        } catch (error) {
          if (error.message === 'payload_too_large') return json(res, 413, { error: 'payload_too_large' });
          if (error.message === 'invalid_json') return json(res, 400, { error: 'invalid_json' });
          return json(res, 500, { error: 'newsletter_failed' });
        }
      }

      if (req.method === 'GET' && url.pathname === '/api/newsletter/stats') {
        const stats = await newsletterService.stats();
        return json(res, 200, stats);
      }

      if (req.method === 'GET' && url.pathname === '/api/products') {
        const products = await cmsService.listProducts();
        return json(res, 200, { rows: products });
      }

      if (req.method === 'GET' && url.pathname === '/api/content') {
        const key = url.searchParams.get('key');
        if (key) {
          const content = await cmsService.getContent(key);
          if (!content) return json(res, 404, { error: 'not_found' });
          return json(res, 200, content);
        }
        const all = await cmsService.listContent();
        return json(res, 200, { rows: all });
      }

      if (req.method === 'GET' && url.pathname.startsWith('/api/content/')) {
        const key = parseKeyFromPath(url.pathname, '/api/content/');
        if (!key) return json(res, 400, { error: 'invalid_key' });
        const content = await cmsService.getContent(key);
        if (!content) return json(res, 404, { error: 'not_found' });
        return json(res, 200, content);
      }

      if (req.method === 'GET' && url.pathname === '/api/media') {
        const media = await cmsService.listMedia();
        return json(res, 200, { rows: media });
      }

      if (req.method === 'POST' && url.pathname === '/api/admin/login') {
        try {
          const body = await parseJsonBody(req);
          const username = String(body.username || '');
          const password = String(body.password || '');

        if (!authService.validateCredentials(username, password)) {
          return json(res, 401, { error: 'invalid_credentials' });
        }

        const token = authService.createToken(username);
        setCookie(res, {
          name: authService.cookieName,
          value: token,
          maxAgeSeconds: env.adminSessionHours * 3600,
          httpOnly: true,
          secure: false,
          sameSite: 'Lax',
          path: '/'
        });

          return json(res, 200, { ok: true, username });
        } catch (error) {
          if (error.message === 'payload_too_large') return json(res, 413, { error: 'payload_too_large' });
          if (error.message === 'invalid_json') return json(res, 400, { error: 'invalid_json' });
          return json(res, 500, { error: 'login_failed' });
        }
      }

      if (req.method === 'POST' && url.pathname === '/api/admin/logout') {
        clearCookie(res, authService.cookieName);
        return json(res, 200, { ok: true });
      }

      if (req.method === 'GET' && url.pathname === '/api/admin/session') {
        const session = requireAdmin(req, res);
        if (!session) return;
        return json(res, 200, { ok: true, username: session.u, exp: session.exp });
      }

      if (req.method === 'GET' && url.pathname === '/api/admin/newsletter/stats') {
        const session = requireAdmin(req, res);
        if (!session) return;
        const stats = await newsletterService.stats();
        return json(res, 200, stats);
      }

      if (req.method === 'GET' && url.pathname === '/api/admin/newsletter/list') {
        const session = requireAdmin(req, res);
        if (!session) return;
        const limit = Number(url.searchParams.get('limit') || 200);
        const offset = Number(url.searchParams.get('offset') || 0);
        const rows = await newsletterService.list({ limit, offset });
        return json(res, 200, { rows, limit, offset });
      }

      if (req.method === 'GET' && url.pathname === '/api/admin/newsletter/export.csv') {
        const session = requireAdmin(req, res);
        if (!session) return;
        const rows = await newsletterService.all();
        const csv = toCsv(rows);
        res.writeHead(200, {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="newsletter-subscribers.csv"',
          'Cache-Control': 'no-store'
        });
        return res.end(csv);
      }

      if (req.method === 'GET' && url.pathname === '/api/admin/products') {
        const session = requireAdmin(req, res);
        if (!session) return;
        const rows = await cmsService.listProducts();
        return json(res, 200, { rows });
      }

      if (req.method === 'POST' && url.pathname === '/api/admin/products') {
        const session = requireAdmin(req, res);
        if (!session) return;
        try {
          const body = await parseJsonBody(req);
          const result = await cmsService.createProduct(body);
          if (!result.ok) return json(res, result.code, { error: result.error });
          return json(res, result.code, result.data);
        } catch (error) {
          if (error.message === 'payload_too_large') return json(res, 413, { error: 'payload_too_large' });
          if (error.message === 'invalid_json') return json(res, 400, { error: 'invalid_json' });
          return json(res, 500, { error: 'product_create_failed' });
        }
      }

      if ((req.method === 'PUT' || req.method === 'PATCH') && url.pathname.startsWith('/api/admin/products/')) {
        const session = requireAdmin(req, res);
        if (!session) return;
        const id = parseIdFromPath(url.pathname, '/api/admin/products/');
        if (!id) return json(res, 400, { error: 'invalid_id' });
        try {
          const body = await parseJsonBody(req);
          const result = await cmsService.updateProduct(id, body);
          if (!result.ok) return json(res, result.code, { error: result.error });
          return json(res, result.code, result.data);
        } catch (error) {
          if (error.message === 'payload_too_large') return json(res, 413, { error: 'payload_too_large' });
          if (error.message === 'invalid_json') return json(res, 400, { error: 'invalid_json' });
          return json(res, 500, { error: 'product_update_failed' });
        }
      }

      if (req.method === 'DELETE' && url.pathname.startsWith('/api/admin/products/')) {
        const session = requireAdmin(req, res);
        if (!session) return;
        const id = parseIdFromPath(url.pathname, '/api/admin/products/');
        if (!id) return json(res, 400, { error: 'invalid_id' });
        const result = await cmsService.deleteProduct(id);
        if (!result.ok) return json(res, result.code, { error: result.error });
        return json(res, result.code, result.data);
      }

      if (req.method === 'GET' && url.pathname === '/api/admin/content') {
        const session = requireAdmin(req, res);
        if (!session) return;
        const rows = await cmsService.listContent();
        return json(res, 200, { rows });
      }

      if (req.method === 'GET' && url.pathname.startsWith('/api/admin/content/')) {
        const session = requireAdmin(req, res);
        if (!session) return;
        const key = parseKeyFromPath(url.pathname, '/api/admin/content/');
        if (!key) return json(res, 400, { error: 'invalid_key' });
        const content = await cmsService.getContent(key);
        if (!content) return json(res, 404, { error: 'not_found' });
        return json(res, 200, content);
      }

      if ((req.method === 'PUT' || req.method === 'PATCH') && url.pathname.startsWith('/api/admin/content/')) {
        const session = requireAdmin(req, res);
        if (!session) return;
        const key = parseKeyFromPath(url.pathname, '/api/admin/content/');
        if (!key) return json(res, 400, { error: 'invalid_key' });
        try {
          const body = await parseJsonBody(req);
          const data = await cmsService.upsertContent(key, body);
          return json(res, 200, data);
        } catch (error) {
          if (error.message === 'payload_too_large') return json(res, 413, { error: 'payload_too_large' });
          if (error.message === 'invalid_json') return json(res, 400, { error: 'invalid_json' });
          return json(res, 500, { error: 'content_upsert_failed' });
        }
      }

      if (req.method === 'GET' && url.pathname === '/api/admin/media') {
        const session = requireAdmin(req, res);
        if (!session) return;
        const rows = await cmsService.listMedia();
        return json(res, 200, { rows });
      }

      if (req.method === 'POST' && url.pathname === '/api/admin/media/upload') {
        const session = requireAdmin(req, res);
        if (!session) return;
        try {
          const body = await parseJsonBody(req, 20_000_000);
          const result = await cmsService.uploadMedia(body);
          if (!result.ok) return json(res, result.code, { error: result.error });
          return json(res, result.code, result.data);
        } catch (error) {
          if (error.message === 'payload_too_large') return json(res, 413, { error: 'payload_too_large' });
          if (error.message === 'invalid_json') return json(res, 400, { error: 'invalid_json' });
          return json(res, 500, { error: 'media_upload_failed' });
        }
      }

      if (req.method === 'DELETE' && url.pathname.startsWith('/api/admin/media/')) {
        const session = requireAdmin(req, res);
        if (!session) return;
        const id = parseIdFromPath(url.pathname, '/api/admin/media/');
        if (!id) return json(res, 400, { error: 'invalid_id' });
        const result = await cmsService.deleteMedia(id);
        if (!result.ok) return json(res, result.code, { error: result.error });
        return json(res, result.code, result.data);
      }

      return json(res, 404, { error: 'not_found' });
    } catch (error) {
      return json(res, 500, { error: 'internal_error' });
    }
  };
}

module.exports = { createApiRouter };
