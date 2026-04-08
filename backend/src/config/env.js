const path = require('path');

function toInt(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

const env = {
  port: toInt(process.env.PORT, 8787),
  dbClient: String(process.env.DB_CLIENT || 'sqlite').toLowerCase(),
  dbPath: process.env.DB_PATH
    ? path.resolve(process.cwd(), process.env.DB_PATH)
    : path.resolve(process.cwd(), 'backend/data/monocle.sqlite'),
  postgresUrl: process.env.POSTGRES_URL || '',
  staticDir: process.env.STATIC_DIR
    ? path.resolve(process.cwd(), process.env.STATIC_DIR)
    : process.cwd(),
  uploadDir: process.env.UPLOAD_DIR
    ? path.resolve(process.cwd(), process.env.UPLOAD_DIR)
    : path.resolve(process.cwd(), 'uploads'),
  dailySlotTotal: toInt(process.env.DAILY_SLOT_TOTAL, 12),
  dailySlotMin: toInt(process.env.DAILY_SLOT_MIN, 4),
  adminUsername: process.env.ADMIN_USERNAME || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
  adminSessionSecret: process.env.ADMIN_SESSION_SECRET || 'change-me-in-production',
  adminSessionHours: toInt(process.env.ADMIN_SESSION_HOURS, 12)
};

module.exports = { env };
