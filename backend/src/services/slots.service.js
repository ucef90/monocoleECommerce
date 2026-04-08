function dayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function computeInitialRemaining(total, min, date = new Date()) {
  const seed = date.getUTCFullYear() + (date.getUTCMonth() + 1) * 17 + date.getUTCDate() * 31;
  const variance = seed % Math.max(1, Math.floor(total / 3));
  return Math.max(min, total - variance);
}

function normalizeSlotRow(row) {
  if (!row) return null;
  return {
    day: typeof row.day === 'string' ? row.day.slice(0, 10) : String(row.day).slice(0, 10),
    total: Number(row.total),
    remaining: Number(row.remaining),
    updated_at: row.updated_at instanceof Date ? row.updated_at.toISOString() : String(row.updated_at)
  };
}

function buildSlotsService(dbConn, config) {
  if (dbConn.client === 'sqlite') {
    const db = dbConn.raw;
    const selectStmt = db.prepare('SELECT day, total, remaining, updated_at FROM slots_inventory WHERE day = ?');
    const upsertStmt = db.prepare(`
      INSERT INTO slots_inventory(day, total, remaining, updated_at)
      VALUES(?, ?, ?, ?)
      ON CONFLICT(day) DO UPDATE SET
        total = excluded.total,
        remaining = excluded.remaining,
        updated_at = excluded.updated_at
    `);

    async function ensureToday() {
      const today = dayKey();
      const row = normalizeSlotRow(selectStmt.get(today));
      if (row) return row;

      const remaining = computeInitialRemaining(config.dailySlotTotal, config.dailySlotMin);
      const now = new Date().toISOString();
      upsertStmt.run(today, config.dailySlotTotal, remaining, now);
      return { day: today, total: config.dailySlotTotal, remaining, updated_at: now };
    }

    async function getSlots() {
      return ensureToday();
    }

    async function reserve(qty = 1) {
      const safeQty = Math.max(1, Math.min(5, Number(qty) || 1));
      const current = await ensureToday();
      const remaining = Math.max(0, current.remaining - safeQty);
      const now = new Date().toISOString();
      upsertStmt.run(current.day, current.total, remaining, now);
      return { ...current, remaining, updated_at: now };
    }

    return { getSlots, reserve };
  }

  if (dbConn.client === 'postgres') {
    const pool = dbConn.raw;

    async function ensureToday() {
      const today = dayKey();
      const selectRes = await pool.query(
        'SELECT day::text AS day, total, remaining, updated_at FROM slots_inventory WHERE day = $1::date',
        [today]
      );

      if (selectRes.rows.length > 0) {
        return normalizeSlotRow(selectRes.rows[0]);
      }

      const remaining = computeInitialRemaining(config.dailySlotTotal, config.dailySlotMin);
      const now = new Date().toISOString();
      await pool.query(
        `INSERT INTO slots_inventory(day, total, remaining, updated_at)
         VALUES($1::date, $2, $3, $4::timestamptz)
         ON CONFLICT(day) DO UPDATE SET
           total = EXCLUDED.total,
           remaining = EXCLUDED.remaining,
           updated_at = EXCLUDED.updated_at`,
        [today, config.dailySlotTotal, remaining, now]
      );

      return { day: today, total: config.dailySlotTotal, remaining, updated_at: now };
    }

    async function getSlots() {
      return ensureToday();
    }

    async function reserve(qty = 1) {
      const safeQty = Math.max(1, Math.min(5, Number(qty) || 1));
      const current = await ensureToday();
      const remaining = Math.max(0, current.remaining - safeQty);
      const now = new Date().toISOString();

      await pool.query(
        `INSERT INTO slots_inventory(day, total, remaining, updated_at)
         VALUES($1::date, $2, $3, $4::timestamptz)
         ON CONFLICT(day) DO UPDATE SET
           total = EXCLUDED.total,
           remaining = EXCLUDED.remaining,
           updated_at = EXCLUDED.updated_at`,
        [current.day, current.total, remaining, now]
      );

      return { ...current, remaining, updated_at: now };
    }

    return { getSlots, reserve };
  }

  throw new Error(`Unsupported DB client for slots service: ${dbConn.client}`);
}

module.exports = { buildSlotsService };
