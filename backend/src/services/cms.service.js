const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function safeSlug(input) {
  return String(input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function safeFilename(name) {
  const base = String(name || 'asset').toLowerCase().replace(/[^a-z0-9._-]/g, '-');
  const cleaned = base.replace(/-+/g, '-').replace(/^[-.]+/, '');
  return cleaned || `asset-${Date.now()}.bin`;
}

function parseJsonSafe(value, fallback) {
  try {
    return JSON.parse(value);
  } catch (_error) {
    return fallback;
  }
}

function normalizeProduct(row) {
  if (!row) return null;
  const extrasRaw = row.extra_json ?? row.extra ?? '[]';
  return {
    id: Number(row.id),
    slug: String(row.slug),
    title: String(row.title),
    description: String(row.description || ''),
    price: Number(row.price) || 0,
    currency: String(row.currency || 'DH'),
    image_url: String(row.image_url || ''),
    gallery: Array.isArray(row.gallery)
      ? row.gallery
      : parseJsonSafe(row.gallery_json || row.gallery || '[]', []),
    category: String(row.category || ''),
    genre: String(row.genre || ''),
    couleur: String(row.couleur || ''),
    forme: String(row.forme || ''),
    matiere: String(row.matiere || ''),
    extra: Array.isArray(extrasRaw) ? extrasRaw : parseJsonSafe(extrasRaw, []),
    sort_order: Number(row.sort_order) || 0,
    stock: Number(row.stock) || 0,
    active: typeof row.active === 'boolean' ? row.active : Number(row.active) === 1,
    created_at: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at),
    updated_at: row.updated_at instanceof Date ? row.updated_at.toISOString() : String(row.updated_at)
  };
}

function normalizeContent(row) {
  if (!row) return null;
  return {
    key: String(row.content_key || row.key),
    title: String(row.title || ''),
    body: String(row.body || ''),
    data: typeof row.data === 'object' && row.data !== null
      ? row.data
      : parseJsonSafe(row.data_json || row.data || '{}', {}),
    updated_at: row.updated_at instanceof Date ? row.updated_at.toISOString() : String(row.updated_at)
  };
}

function normalizeMedia(row) {
  if (!row) return null;
  return {
    id: Number(row.id),
    filename: String(row.filename),
    url: String(row.url),
    mime_type: String(row.mime_type),
    size_bytes: Number(row.size_bytes) || 0,
    created_at: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at)
  };
}

function buildCmsService(dbConn, env) {
  ensureDir(env.uploadDir);

  if (dbConn.client === 'sqlite') {
    const db = dbConn.raw;

    const listProductsStmt = db.prepare('SELECT * FROM products ORDER BY CASE WHEN sort_order <= 0 THEN 2147483647 ELSE sort_order END ASC, id DESC');
    const maxSortOrderStmt = db.prepare('SELECT COALESCE(MAX(sort_order), 0) AS max_sort_order FROM products');
    const getProductStmt = db.prepare('SELECT * FROM products WHERE id = ?');
    const createProductStmt = db.prepare(`
      INSERT INTO products(
        slug, title, description, price, currency, image_url, gallery_json, category, genre, couleur, forme, matiere, extra_json, sort_order, stock, active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const updateProductStmt = db.prepare(`
      UPDATE products
      SET slug = ?, title = ?, description = ?, price = ?, currency = ?, image_url = ?, gallery_json = ?, category = ?, genre = ?, couleur = ?, forme = ?, matiere = ?, extra_json = ?, sort_order = ?, stock = ?, active = ?, updated_at = ?
      WHERE id = ?
    `);
    const deleteProductStmt = db.prepare('DELETE FROM products WHERE id = ?');

    const getContentStmt = db.prepare('SELECT * FROM site_content WHERE content_key = ?');
    const listContentStmt = db.prepare('SELECT * FROM site_content ORDER BY content_key ASC');
    const upsertContentStmt = db.prepare(`
      INSERT INTO site_content(content_key, title, body, data_json, updated_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(content_key) DO UPDATE SET
        title = excluded.title,
        body = excluded.body,
        data_json = excluded.data_json,
        updated_at = excluded.updated_at
    `);

    const listMediaStmt = db.prepare('SELECT * FROM media_assets ORDER BY id DESC');
    const createMediaStmt = db.prepare(`
      INSERT INTO media_assets(filename, url, mime_type, size_bytes, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);
    const getMediaStmt = db.prepare('SELECT * FROM media_assets WHERE id = ?');
    const deleteMediaStmt = db.prepare('DELETE FROM media_assets WHERE id = ?');

    async function listProducts() {
      return listProductsStmt.all().map(normalizeProduct);
    }

    async function createProduct(payload) {
      const now = new Date().toISOString();
      const title = String(payload.title || '').trim();
      const slug = safeSlug(payload.slug || title);
      if (!title || !slug) return { ok: false, code: 400, error: 'invalid_product' };

      const gallery = Array.isArray(payload.gallery) ? payload.gallery : [];
      const extra = Array.isArray(payload.extra) ? payload.extra : [];
      const maxSort = maxSortOrderStmt.get();
      const nextSort = Number(payload.sort_order);
      const sortOrder = Number.isFinite(nextSort) && nextSort > 0
        ? Math.floor(nextSort)
        : (Number(maxSort.max_sort_order) || 0) + 1;
      try {
        createProductStmt.run(
          slug,
          title,
          String(payload.description || ''),
          Number(payload.price) || 0,
          String(payload.currency || 'DH'),
          String(payload.image_url || ''),
          JSON.stringify(gallery),
          String(payload.category || ''),
          String(payload.genre || ''),
          String(payload.couleur || ''),
          String(payload.forme || ''),
          String(payload.matiere || ''),
          JSON.stringify(extra),
          sortOrder,
          Math.max(0, Number(payload.stock) || 0),
          payload.active === false ? 0 : 1,
          now,
          now
        );
        const created = db.prepare('SELECT * FROM products WHERE id = last_insert_rowid()').get();
        return { ok: true, code: 201, data: normalizeProduct(created) };
      } catch (error) {
        if (String(error.message || '').includes('UNIQUE')) return { ok: false, code: 409, error: 'slug_exists' };
        return { ok: false, code: 500, error: 'create_failed' };
      }
    }

    async function updateProduct(id, payload) {
      const current = getProductStmt.get(id);
      if (!current) return { ok: false, code: 404, error: 'not_found' };

      const next = {
        slug: safeSlug(payload.slug ?? current.slug),
        title: String(payload.title ?? current.title).trim(),
        description: String(payload.description ?? current.description ?? ''),
        price: Number(payload.price ?? current.price) || 0,
        currency: String(payload.currency ?? current.currency ?? 'DH'),
        image_url: String(payload.image_url ?? current.image_url ?? ''),
        gallery_json: JSON.stringify(Array.isArray(payload.gallery) ? payload.gallery : parseJsonSafe(current.gallery_json || '[]', [])),
        category: String(payload.category ?? current.category ?? ''),
        genre: String(payload.genre ?? current.genre ?? ''),
        couleur: String(payload.couleur ?? current.couleur ?? ''),
        forme: String(payload.forme ?? current.forme ?? ''),
        matiere: String(payload.matiere ?? current.matiere ?? ''),
        extra_json: JSON.stringify(Array.isArray(payload.extra) ? payload.extra : parseJsonSafe(current.extra_json || '[]', [])),
        sort_order: Math.max(0, Number(payload.sort_order ?? current.sort_order) || 0),
        stock: Math.max(0, Number(payload.stock ?? current.stock) || 0),
        active: payload.active === undefined ? current.active : (payload.active ? 1 : 0),
        updated_at: new Date().toISOString()
      };

      try {
        updateProductStmt.run(
          next.slug,
          next.title,
          next.description,
          next.price,
          next.currency,
          next.image_url,
          next.gallery_json,
          next.category,
          next.genre,
          next.couleur,
          next.forme,
          next.matiere,
          next.extra_json,
          next.sort_order,
          next.stock,
          next.active,
          next.updated_at,
          id
        );
        return { ok: true, code: 200, data: normalizeProduct(getProductStmt.get(id)) };
      } catch (error) {
        if (String(error.message || '').includes('UNIQUE')) return { ok: false, code: 409, error: 'slug_exists' };
        return { ok: false, code: 500, error: 'update_failed' };
      }
    }

    async function deleteProduct(id) {
      deleteProductStmt.run(id);
      return { ok: true, code: 200, data: { deleted: true } };
    }

    async function getContent(key) {
      return normalizeContent(getContentStmt.get(key));
    }

    async function getContentMany(keys) {
      const uniqueKeys = Array.from(new Set((Array.isArray(keys) ? keys : []).map((key) => String(key || '').trim()).filter(Boolean)));
      if (!uniqueKeys.length) return {};
      const rows = uniqueKeys
        .map((key) => getContentStmt.get(key))
        .filter(Boolean)
        .map(normalizeContent);
      return rows.reduce((acc, row) => {
        acc[row.key] = row;
        return acc;
      }, {});
    }

    async function listContent() {
      return listContentStmt.all().map(normalizeContent);
    }

    async function upsertContent(key, payload) {
      const now = new Date().toISOString();
      upsertContentStmt.run(
        key,
        String(payload.title || ''),
        String(payload.body || ''),
        JSON.stringify(payload.data && typeof payload.data === 'object' ? payload.data : {}),
        now
      );
      return normalizeContent(getContentStmt.get(key));
    }

    async function listMedia() {
      return listMediaStmt.all().map(normalizeMedia);
    }

    async function uploadMedia(payload) {
      const filename = safeFilename(payload.filename);
      const mimeType = String(payload.mime_type || 'application/octet-stream');
      const dataBase64 = String(payload.data_base64 || '');
      if (!dataBase64) return { ok: false, code: 400, error: 'missing_data' };

      const fileBuffer = Buffer.from(dataBase64, 'base64');
      const fullPath = path.join(env.uploadDir, filename);
      fs.writeFileSync(fullPath, fileBuffer);
      const url = `/uploads/${filename}`;
      const now = new Date().toISOString();

      try {
        createMediaStmt.run(filename, url, mimeType, fileBuffer.length, now);
        const row = db.prepare('SELECT * FROM media_assets WHERE id = last_insert_rowid()').get();
        return { ok: true, code: 201, data: normalizeMedia(row) };
      } catch (error) {
        return { ok: false, code: 500, error: 'media_create_failed' };
      }
    }

    async function deleteMedia(id) {
      const row = getMediaStmt.get(id);
      if (!row) return { ok: false, code: 404, error: 'not_found' };
      const fullPath = path.join(env.uploadDir, row.filename);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      deleteMediaStmt.run(id);
      return { ok: true, code: 200, data: { deleted: true } };
    }

    return {
      listProducts,
      createProduct,
      updateProduct,
      deleteProduct,
      getContent,
      getContentMany,
      listContent,
      upsertContent,
      listMedia,
      uploadMedia,
      deleteMedia
    };
  }

  if (dbConn.client === 'postgres') {
    const pool = dbConn.raw;

    async function listProducts() {
      const res = await pool.query('SELECT * FROM products ORDER BY CASE WHEN sort_order <= 0 THEN 2147483647 ELSE sort_order END ASC, id DESC');
      return res.rows.map((row) => normalizeProduct({ ...row, gallery: row.gallery_json }));
    }

    async function createProduct(payload) {
      const now = new Date().toISOString();
      const title = String(payload.title || '').trim();
      const slug = safeSlug(payload.slug || title);
      if (!title || !slug) return { ok: false, code: 400, error: 'invalid_product' };
      const gallery = Array.isArray(payload.gallery) ? payload.gallery : [];
      const maxSortRes = await pool.query('SELECT COALESCE(MAX(sort_order), 0) AS max_sort_order FROM products');
      const parsedSort = Number(payload.sort_order);
      const sortOrder = Number.isFinite(parsedSort) && parsedSort > 0
        ? Math.floor(parsedSort)
        : (Number(maxSortRes.rows[0].max_sort_order) || 0) + 1;

      try {
        const res = await pool.query(
          `INSERT INTO products(
            slug, title, description, price, currency, image_url, gallery_json, category, genre, couleur, forme, matiere, extra_json, sort_order, stock, active, created_at, updated_at
          ) VALUES($1,$2,$3,$4,$5,$6,$7::jsonb,$8,$9,$10,$11,$12,$13::jsonb,$14,$15,$16,$17::timestamptz,$18::timestamptz)
          RETURNING *`,
          [
            slug,
            title,
            String(payload.description || ''),
            Number(payload.price) || 0,
            String(payload.currency || 'DH'),
            String(payload.image_url || ''),
            JSON.stringify(gallery),
            String(payload.category || ''),
            String(payload.genre || ''),
            String(payload.couleur || ''),
            String(payload.forme || ''),
            String(payload.matiere || ''),
            JSON.stringify(Array.isArray(payload.extra) ? payload.extra : []),
            sortOrder,
            Math.max(0, Number(payload.stock) || 0),
            payload.active === false ? false : true,
            now,
            now
          ]
        );
        return { ok: true, code: 201, data: normalizeProduct({ ...res.rows[0], gallery: res.rows[0].gallery_json }) };
      } catch (error) {
        if (error && error.code === '23505') return { ok: false, code: 409, error: 'slug_exists' };
        return { ok: false, code: 500, error: 'create_failed' };
      }
    }

    async function updateProduct(id, payload) {
      const existingRes = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
      if (existingRes.rows.length === 0) return { ok: false, code: 404, error: 'not_found' };
      const current = existingRes.rows[0];

      const next = {
        slug: safeSlug(payload.slug ?? current.slug),
        title: String(payload.title ?? current.title).trim(),
        description: String(payload.description ?? current.description ?? ''),
        price: Number(payload.price ?? current.price) || 0,
        currency: String(payload.currency ?? current.currency ?? 'DH'),
        image_url: String(payload.image_url ?? current.image_url ?? ''),
        gallery_json: JSON.stringify(Array.isArray(payload.gallery) ? payload.gallery : (current.gallery_json || [])),
        category: String(payload.category ?? current.category ?? ''),
        genre: String(payload.genre ?? current.genre ?? ''),
        couleur: String(payload.couleur ?? current.couleur ?? ''),
        forme: String(payload.forme ?? current.forme ?? ''),
        matiere: String(payload.matiere ?? current.matiere ?? ''),
        extra_json: JSON.stringify(Array.isArray(payload.extra) ? payload.extra : (current.extra_json || [])),
        sort_order: Math.max(0, Number(payload.sort_order ?? current.sort_order) || 0),
        stock: Math.max(0, Number(payload.stock ?? current.stock) || 0),
        active: payload.active === undefined ? current.active : !!payload.active,
        updated_at: new Date().toISOString()
      };

      try {
        const res = await pool.query(
          `UPDATE products
           SET slug = $1, title = $2, description = $3, price = $4, currency = $5, image_url = $6,
               gallery_json = $7::jsonb, category = $8, genre = $9, couleur = $10, forme = $11, matiere = $12,
               extra_json = $13::jsonb, sort_order = $14, stock = $15, active = $16, updated_at = $17::timestamptz
           WHERE id = $18
           RETURNING *`,
          [
            next.slug,
            next.title,
            next.description,
            next.price,
            next.currency,
            next.image_url,
            next.gallery_json,
            next.category,
            next.genre,
            next.couleur,
            next.forme,
            next.matiere,
            next.extra_json,
            next.sort_order,
            next.stock,
            next.active,
            next.updated_at,
            id
          ]
        );
        return { ok: true, code: 200, data: normalizeProduct({ ...res.rows[0], gallery: res.rows[0].gallery_json }) };
      } catch (error) {
        if (error && error.code === '23505') return { ok: false, code: 409, error: 'slug_exists' };
        return { ok: false, code: 500, error: 'update_failed' };
      }
    }

    async function deleteProduct(id) {
      await pool.query('DELETE FROM products WHERE id = $1', [id]);
      return { ok: true, code: 200, data: { deleted: true } };
    }

    async function getContent(key) {
      const res = await pool.query('SELECT * FROM site_content WHERE content_key = $1', [key]);
      return res.rows[0] ? normalizeContent({ ...res.rows[0], data: res.rows[0].data_json }) : null;
    }

    async function getContentMany(keys) {
      const uniqueKeys = Array.from(new Set((Array.isArray(keys) ? keys : []).map((key) => String(key || '').trim()).filter(Boolean)));
      if (!uniqueKeys.length) return {};
      const res = await pool.query('SELECT * FROM site_content WHERE content_key = ANY($1::text[])', [uniqueKeys]);
      return res.rows
        .map((row) => normalizeContent({ ...row, data: row.data_json }))
        .reduce((acc, row) => {
          acc[row.key] = row;
          return acc;
        }, {});
    }

    async function listContent() {
      const res = await pool.query('SELECT * FROM site_content ORDER BY content_key ASC');
      return res.rows.map((row) => normalizeContent({ ...row, data: row.data_json }));
    }

    async function upsertContent(key, payload) {
      const now = new Date().toISOString();
      const res = await pool.query(
        `INSERT INTO site_content(content_key, title, body, data_json, updated_at)
         VALUES($1, $2, $3, $4::jsonb, $5::timestamptz)
         ON CONFLICT(content_key) DO UPDATE SET
           title = EXCLUDED.title,
           body = EXCLUDED.body,
           data_json = EXCLUDED.data_json,
           updated_at = EXCLUDED.updated_at
         RETURNING *`,
        [
          key,
          String(payload.title || ''),
          String(payload.body || ''),
          JSON.stringify(payload.data && typeof payload.data === 'object' ? payload.data : {}),
          now
        ]
      );
      return normalizeContent({ ...res.rows[0], data: res.rows[0].data_json });
    }

    async function listMedia() {
      const res = await pool.query('SELECT * FROM media_assets ORDER BY id DESC');
      return res.rows.map(normalizeMedia);
    }

    async function uploadMedia(payload) {
      const filename = safeFilename(payload.filename);
      const mimeType = String(payload.mime_type || 'application/octet-stream');
      const dataBase64 = String(payload.data_base64 || '');
      if (!dataBase64) return { ok: false, code: 400, error: 'missing_data' };

      const fileBuffer = Buffer.from(dataBase64, 'base64');
      const fullPath = path.join(env.uploadDir, filename);
      fs.writeFileSync(fullPath, fileBuffer);
      const url = `/uploads/${filename}`;
      const now = new Date().toISOString();

      try {
        const res = await pool.query(
          `INSERT INTO media_assets(filename, url, mime_type, size_bytes, created_at)
           VALUES($1, $2, $3, $4, $5::timestamptz)
           RETURNING *`,
          [filename, url, mimeType, fileBuffer.length, now]
        );
        return { ok: true, code: 201, data: normalizeMedia(res.rows[0]) };
      } catch (error) {
        if (error && error.code === '23505') return { ok: false, code: 409, error: 'filename_exists' };
        return { ok: false, code: 500, error: 'media_create_failed' };
      }
    }

    async function deleteMedia(id) {
      const res = await pool.query('SELECT * FROM media_assets WHERE id = $1', [id]);
      if (res.rows.length === 0) return { ok: false, code: 404, error: 'not_found' };
      const row = res.rows[0];
      const fullPath = path.join(env.uploadDir, row.filename);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      await pool.query('DELETE FROM media_assets WHERE id = $1', [id]);
      return { ok: true, code: 200, data: { deleted: true } };
    }

    return {
      listProducts,
      createProduct,
      updateProduct,
      deleteProduct,
      getContent,
      getContentMany,
      listContent,
      upsertContent,
      listMedia,
      uploadMedia,
      deleteMedia
    };
  }

  throw new Error(`Unsupported DB client for CMS service: ${dbConn.client}`);
}

module.exports = { buildCmsService };
