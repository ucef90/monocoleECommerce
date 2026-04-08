const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function sanitizeSource(source) {
  return String(source || 'website').trim().slice(0, 80) || 'website';
}

function normalizeRow(row) {
  if (!row) return null;
  return {
    id: Number(row.id),
    email: String(row.email),
    source: String(row.source),
    discount_code: String(row.discount_code),
    created_at: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at)
  };
}

function buildNewsletterService(dbConn) {
  const discountCode = 'BIENVENUE10';

  if (dbConn.client === 'sqlite') {
    const db = dbConn.raw;
    const insertStmt = db.prepare(`
      INSERT INTO newsletter_subscribers(email, source, discount_code, created_at)
      VALUES(?, ?, ?, ?)
    `);
    const countStmt = db.prepare('SELECT COUNT(*) AS count FROM newsletter_subscribers');
    const findStmt = db.prepare('SELECT id, email, source, discount_code, created_at FROM newsletter_subscribers WHERE email = ?');
    const listStmt = db.prepare(`
      SELECT id, email, source, discount_code, created_at
      FROM newsletter_subscribers
      ORDER BY datetime(created_at) DESC
      LIMIT ? OFFSET ?
    `);
    const allStmt = db.prepare(`
      SELECT id, email, source, discount_code, created_at
      FROM newsletter_subscribers
      ORDER BY datetime(created_at) DESC
    `);

    async function subscribe(payload = {}) {
      const email = sanitizeEmail(payload.email);
      const source = sanitizeSource(payload.source);

      if (!EMAIL_RE.test(email)) {
        return { ok: false, code: 400, error: 'invalid_email' };
      }

      const existing = normalizeRow(findStmt.get(email));
      if (existing) {
        return {
          ok: true,
          code: 200,
          data: {
            alreadySubscribed: true,
            discountCode: existing.discount_code,
            email: existing.email
          }
        };
      }

      const createdAt = new Date().toISOString();
      try {
        insertStmt.run(email, source, discountCode, createdAt);
        return {
          ok: true,
          code: 201,
          data: {
            alreadySubscribed: false,
            discountCode,
            email
          }
        };
      } catch (_error) {
        return { ok: false, code: 500, error: 'subscription_failed' };
      }
    }

    async function stats() {
      const row = countStmt.get();
      return { subscribers: Number(row.count) || 0 };
    }

    async function list({ limit = 200, offset = 0 } = {}) {
      const safeLimit = Math.max(1, Math.min(1000, Number(limit) || 200));
      const safeOffset = Math.max(0, Number(offset) || 0);
      return listStmt.all(safeLimit, safeOffset).map(normalizeRow);
    }

    async function all() {
      return allStmt.all().map(normalizeRow);
    }

    return { subscribe, stats, list, all };
  }

  if (dbConn.client === 'postgres') {
    const pool = dbConn.raw;

    async function subscribe(payload = {}) {
      const email = sanitizeEmail(payload.email);
      const source = sanitizeSource(payload.source);

      if (!EMAIL_RE.test(email)) {
        return { ok: false, code: 400, error: 'invalid_email' };
      }

      const existingRes = await pool.query(
        'SELECT id, email, source, discount_code, created_at FROM newsletter_subscribers WHERE email = $1',
        [email]
      );

      if (existingRes.rows.length > 0) {
        const existing = normalizeRow(existingRes.rows[0]);
        return {
          ok: true,
          code: 200,
          data: {
            alreadySubscribed: true,
            discountCode: existing.discount_code,
            email: existing.email
          }
        };
      }

      const createdAt = new Date().toISOString();
      try {
        await pool.query(
          `INSERT INTO newsletter_subscribers(email, source, discount_code, created_at)
           VALUES($1, $2, $3, $4::timestamptz)`,
          [email, source, discountCode, createdAt]
        );

        return {
          ok: true,
          code: 201,
          data: {
            alreadySubscribed: false,
            discountCode,
            email
          }
        };
      } catch (error) {
        if (error && error.code === '23505') {
          return {
            ok: true,
            code: 200,
            data: {
              alreadySubscribed: true,
              discountCode,
              email
            }
          };
        }
        return { ok: false, code: 500, error: 'subscription_failed' };
      }
    }

    async function stats() {
      const res = await pool.query('SELECT COUNT(*)::int AS count FROM newsletter_subscribers');
      return { subscribers: Number(res.rows[0].count) || 0 };
    }

    async function list({ limit = 200, offset = 0 } = {}) {
      const safeLimit = Math.max(1, Math.min(1000, Number(limit) || 200));
      const safeOffset = Math.max(0, Number(offset) || 0);
      const res = await pool.query(
        `SELECT id, email, source, discount_code, created_at
         FROM newsletter_subscribers
         ORDER BY created_at DESC
         LIMIT $1 OFFSET $2`,
        [safeLimit, safeOffset]
      );
      return res.rows.map(normalizeRow);
    }

    async function all() {
      const res = await pool.query(
        `SELECT id, email, source, discount_code, created_at
         FROM newsletter_subscribers
         ORDER BY created_at DESC`
      );
      return res.rows.map(normalizeRow);
    }

    return { subscribe, stats, list, all };
  }

  throw new Error(`Unsupported DB client for newsletter service: ${dbConn.client}`);
}

module.exports = { buildNewsletterService };
