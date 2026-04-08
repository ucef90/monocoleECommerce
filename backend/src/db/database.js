const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const { env } = require('../config/env');

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function readSqlFiles(directory) {
  const dir = path.resolve(process.cwd(), directory);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();
  return files.map((file) => fs.readFileSync(path.join(dir, file), 'utf8'));
}

function runSqliteMigrations(db) {
  const files = readSqlFiles('backend/migrations');
  files.forEach((sql) => {
    const parts = sql
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean);

    parts.forEach((statement) => {
      try {
        db.exec(statement + ';');
      } catch (error) {
        const message = String((error && error.message) || '').toLowerCase();
        const isDuplicateColumn = message.includes('duplicate column name');
        if (!isDuplicateColumn) throw error;
      }
    });
  });
}

async function runPostgresMigrations(pool) {
  const statements = readSqlFiles('backend/migrations-postgres');
  for (const sql of statements) {
    await pool.query(sql);
  }
}

function createSqliteDb() {
  const { DatabaseSync } = require('node:sqlite');
  ensureDir(env.dbPath);
  const sqlite = new DatabaseSync(env.dbPath);
  sqlite.exec('PRAGMA journal_mode = WAL;');
  sqlite.exec('PRAGMA foreign_keys = ON;');
  runSqliteMigrations(sqlite);
  return { client: 'sqlite', raw: sqlite };
}

async function createPostgresDb() {
  if (!env.postgresUrl) {
    throw new Error('POSTGRES_URL est requis lorsque DB_CLIENT=postgres');
  }

  const pool = new Pool({
    connectionString: env.postgresUrl,
    max: 10,
    idleTimeoutMillis: 30000
  });

  try {
    await pool.query('SELECT 1');
    await runPostgresMigrations(pool);
  } catch (error) {
    await pool.end().catch(() => {});
    throw new Error(`PostgreSQL connection/migration failed: ${error.message || String(error)}`);
  }

  return { client: 'postgres', raw: pool };
}

async function createDb() {
  if (env.dbClient === 'sqlite') {
    return createSqliteDb();
  }

  if (env.dbClient === 'postgres') {
    return createPostgresDb();
  }

  throw new Error(`DB_CLIENT invalide: ${env.dbClient}`);
}

module.exports = { createDb };
