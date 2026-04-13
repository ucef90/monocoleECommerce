ALTER TABLE products ADD COLUMN base_price REAL NOT NULL DEFAULT 0;
ALTER TABLE products ADD COLUMN promo_price REAL NOT NULL DEFAULT 0;
ALTER TABLE products ADD COLUMN promo_active INTEGER NOT NULL DEFAULT 0;

UPDATE products
SET base_price = CASE WHEN base_price <= 0 THEN price ELSE base_price END
WHERE base_price <= 0;
