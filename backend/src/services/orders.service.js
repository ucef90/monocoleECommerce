function toMoney(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return 0;
  return Math.round(amount * 100) / 100;
}

function digitsOnly(value) {
  return String(value || '').replace(/\D/g, '');
}

function isEmailValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

function createReference() {
  const stamp = Date.now().toString(36).toUpperCase();
  const salt = Math.floor(Math.random() * 1679616).toString(36).toUpperCase().padStart(4, '0');
  return `MON-${stamp}-${salt}`;
}

function normalizeOrder(row) {
  if (!row) return null;
  return {
    id: Number(row.id),
    reference: String(row.reference),
    customer_name: String(row.customer_name),
    customer_email: String(row.customer_email),
    customer_phone: String(row.customer_phone),
    shipping_address: String(row.shipping_address),
    shipping_city: String(row.shipping_city),
    shipping_zip: String(row.shipping_zip),
    shipping_country: String(row.shipping_country),
    shipping_method: String(row.shipping_method),
    shipping_cost: Number(row.shipping_cost) || 0,
    subtotal: Number(row.subtotal) || 0,
    total: Number(row.total) || 0,
    currency: String(row.currency || 'DH'),
    status: String(row.status || 'pending'),
    source: String(row.source || 'website'),
    created_at: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at)
  };
}

function validatePayload(payload) {
  const customer = payload && typeof payload.customer === 'object' ? payload.customer : {};
  const shipping = payload && typeof payload.shipping === 'object' ? payload.shipping : {};
  const items = Array.isArray(payload && payload.items) ? payload.items : [];

  const normalizedItems = items
    .map((item) => ({
      product_id: Number(item && item.product_id),
      qty: Math.max(0, Number(item && item.qty) || 0),
      color: String((item && item.color) || '').trim(),
      size: String((item && item.size) || '').trim()
    }))
    .filter((item) => Number.isInteger(item.product_id) && item.product_id > 0 && item.qty > 0);

  if (String(customer.name || '').trim().length < 3) return { ok: false, code: 400, error: 'invalid_customer_name' };
  const normalizedEmail = String(customer.email || '').trim();
  if (normalizedEmail && !isEmailValid(normalizedEmail)) return { ok: false, code: 400, error: 'invalid_customer_email' };
  if (digitsOnly(customer.phone).length < 9) return { ok: false, code: 400, error: 'invalid_customer_phone' };
  if (String(shipping.address || '').trim().length < 5) return { ok: false, code: 400, error: 'invalid_shipping_address' };
  if (String(shipping.city || '').trim().length < 2) return { ok: false, code: 400, error: 'invalid_shipping_city' };
  if (String(shipping.country || 'Morocco').trim().length < 2) return { ok: false, code: 400, error: 'invalid_shipping_country' };
  if (!['standard', 'express', 'cod'].includes(String(shipping.method || 'cod'))) return { ok: false, code: 400, error: 'invalid_shipping_method' };
  if (!normalizedItems.length) return { ok: false, code: 400, error: 'empty_items' };

  return {
    ok: true,
    data: {
      customer_name: String(customer.name).trim(),
      customer_email: normalizedEmail,
      customer_phone: String(customer.phone).trim(),
      shipping_address: String(shipping.address).trim(),
      shipping_city: String(shipping.city).trim(),
      shipping_zip: String(shipping.zip || '').trim(),
      shipping_country: String(shipping.country || 'Morocco').trim(),
      shipping_method: String(shipping.method || 'cod'),
      shipping_cost: toMoney(shipping.cost),
      items: normalizedItems
    }
  };
}

function buildOrdersService(db) {
  if (db.client === 'sqlite') {
    const raw = db.raw;
    const insertOrderStmt = raw.prepare(`
      INSERT INTO orders (
        reference, customer_name, customer_email, customer_phone, shipping_address, shipping_city,
        shipping_zip, shipping_country, shipping_method, shipping_cost, subtotal, total, currency,
        status, source, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const insertItemStmt = raw.prepare(`
      INSERT INTO order_items (
        order_id, product_id, product_title, variant_color, variant_size, unit_price, qty, line_total, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const getOrderStmt = raw.prepare('SELECT * FROM orders WHERE id = ?');
    const listOrdersStmt = raw.prepare('SELECT * FROM orders ORDER BY id DESC');
    const getProductStmt = raw.prepare('SELECT * FROM products WHERE id = ?');
    const decrementStockStmt = raw.prepare('UPDATE products SET stock = ?, updated_at = ? WHERE id = ?');

    async function createOrder(payload) {
      const validated = validatePayload(payload);
      if (!validated.ok) return validated;

      const { items, ...base } = validated.data;
      const now = new Date().toISOString();
      const reference = createReference();

      raw.exec('BEGIN IMMEDIATE');
      try {
        const orderLines = items.map((item) => {
          const product = getProductStmt.get(item.product_id);
          if (!product || Number(product.active) !== 1) {
            const error = new Error('product_not_found');
            error.code = 404;
            throw error;
          }

          const available = Math.max(0, Number(product.stock) || 0);
          if (available < item.qty) {
            const error = new Error('insufficient_stock');
            error.code = 409;
            error.productId = item.product_id;
            error.available = available;
            error.requested = item.qty;
            error.title = product.title;
            throw error;
          }

          return {
            product_id: Number(product.id),
            product_title: String(product.title),
            variant_color: item.color,
            variant_size: item.size,
            unit_price: toMoney(product.price),
            qty: item.qty,
            line_total: toMoney(Number(product.price) * item.qty),
            next_stock: available - item.qty
          };
        });

        const subtotal = toMoney(orderLines.reduce((sum, line) => sum + line.line_total, 0));
        const total = toMoney(subtotal + base.shipping_cost);
        const orderResult = insertOrderStmt.run(
          reference,
          base.customer_name,
          base.customer_email,
          base.customer_phone,
          base.shipping_address,
          base.shipping_city,
          base.shipping_zip,
          base.shipping_country,
          base.shipping_method,
          base.shipping_cost,
          subtotal,
          total,
          'DH',
          'pending',
          'website',
          now,
          now
        );

        orderLines.forEach((line) => {
          insertItemStmt.run(
            orderResult.lastInsertRowid,
            line.product_id,
            line.product_title,
            line.variant_color,
            line.variant_size,
            line.unit_price,
            line.qty,
            line.line_total,
            now
          );
          decrementStockStmt.run(line.next_stock, now, line.product_id);
        });

        raw.exec('COMMIT');
        return {
          ok: true,
          code: 201,
          data: {
            order: normalizeOrder(getOrderStmt.get(orderResult.lastInsertRowid)),
            items: orderLines.map(({ next_stock, ...line }) => line)
          }
        };
      } catch (error) {
        raw.exec('ROLLBACK');
        if (error && error.message === 'product_not_found') return { ok: false, code: error.code || 404, error: 'product_not_found' };
        if (error && error.message === 'insufficient_stock') {
          return {
            ok: false,
            code: error.code || 409,
            error: 'insufficient_stock',
            data: {
              product_id: error.productId,
              title: error.title,
              available: error.available,
              requested: error.requested
            }
          };
        }
        return { ok: false, code: 500, error: 'order_create_failed' };
      }
    }

    async function listOrders() {
      return listOrdersStmt.all().map(normalizeOrder);
    }

    return { createOrder, listOrders };
  }

  const pool = db.raw;

  async function createOrder(payload) {
    const validated = validatePayload(payload);
    if (!validated.ok) return validated;

    const client = await pool.connect();
    const { items, ...base } = validated.data;
    const now = new Date().toISOString();
    const reference = createReference();

    try {
      await client.query('BEGIN');

      const orderLines = [];
      for (const item of items) {
        const productRes = await client.query('SELECT * FROM products WHERE id = $1 FOR UPDATE', [item.product_id]);
        const product = productRes.rows[0];
        if (!product || product.active !== true) {
          await client.query('ROLLBACK');
          return { ok: false, code: 404, error: 'product_not_found' };
        }

        const available = Math.max(0, Number(product.stock) || 0);
        if (available < item.qty) {
          await client.query('ROLLBACK');
          return {
            ok: false,
            code: 409,
            error: 'insufficient_stock',
            data: {
              product_id: Number(product.id),
              title: String(product.title),
              available,
              requested: item.qty
            }
          };
        }

        orderLines.push({
          product_id: Number(product.id),
          product_title: String(product.title),
          variant_color: item.color,
          variant_size: item.size,
          unit_price: toMoney(product.price),
          qty: item.qty,
          line_total: toMoney(Number(product.price) * item.qty),
          next_stock: available - item.qty
        });
      }

      const subtotal = toMoney(orderLines.reduce((sum, line) => sum + line.line_total, 0));
      const total = toMoney(subtotal + base.shipping_cost);

      const orderRes = await client.query(`
        INSERT INTO orders (
          reference, customer_name, customer_email, customer_phone, shipping_address, shipping_city,
          shipping_zip, shipping_country, shipping_method, shipping_cost, subtotal, total, currency,
          status, source, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16::timestamptz, $17::timestamptz
        )
        RETURNING *
      `, [
        reference,
        base.customer_name,
        base.customer_email,
        base.customer_phone,
        base.shipping_address,
        base.shipping_city,
        base.shipping_zip,
        base.shipping_country,
        base.shipping_method,
        base.shipping_cost,
        subtotal,
        total,
        'DH',
        'pending',
        'website',
        now,
        now
      ]);

      for (const line of orderLines) {
        await client.query(`
          INSERT INTO order_items (
            order_id, product_id, product_title, variant_color, variant_size, unit_price, qty, line_total, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::timestamptz)
        `, [
          orderRes.rows[0].id,
          line.product_id,
          line.product_title,
          line.variant_color,
          line.variant_size,
          line.unit_price,
          line.qty,
          line.line_total,
          now
        ]);

        await client.query('UPDATE products SET stock = $1, updated_at = $2::timestamptz WHERE id = $3', [
          line.next_stock,
          now,
          line.product_id
        ]);
      }

      await client.query('COMMIT');
      return {
        ok: true,
        code: 201,
        data: {
          order: normalizeOrder(orderRes.rows[0]),
          items: orderLines.map(({ next_stock, ...line }) => line)
        }
      };
    } catch (_error) {
      await client.query('ROLLBACK').catch(() => {});
      return { ok: false, code: 500, error: 'order_create_failed' };
    } finally {
      client.release();
    }
  }

  async function listOrders() {
    const res = await pool.query('SELECT * FROM orders ORDER BY id DESC');
    return res.rows.map(normalizeOrder);
  }

  return { createOrder, listOrders };
}

module.exports = { buildOrdersService };
