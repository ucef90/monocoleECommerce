const { createDb } = require('../db/database');
const { buildCmsService } = require('../services/cms.service');
const { env } = require('../config/env');

function toSlug(input) {
  return String(input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const seedProducts = [
  { name: 'Style Creamy', genre: 'Femme', couleur: 'Ecaille', forme: 'Papillon', matiere: 'Acetate', extra: ['Oversize'], price: 190, image: './modele_pk9_1_jylsc_pour_maison_bonnet.jpg' },
  { name: 'Jet Line', genre: 'Homme', couleur: 'Noir', forme: 'Pilote', matiere: 'Metal', extra: ['Polarisant'], price: 190, image: './h_01-ray-2-1-768x512.jpg' },
  { name: 'Santa Rosa', genre: 'Unisexe', couleur: 'Or', forme: 'Ronde', matiere: 'Combine', extra: ['Polarisant'], price: 170, image: './h_01-auguste-2-768x512.jpg' },
  { name: 'Road Texas', genre: 'Homme', couleur: 'Vert', forme: 'Carree', matiere: 'Acetate', extra: [], price: 150, image: './h_01-longuemare-4-768x512.jpg' },
  { name: 'Liquid Velvet', genre: 'Femme', couleur: 'Noir', forme: 'Papillon', matiere: 'Metal', extra: ['Polarisant'], price: 210, image: './f_01-sully-1-768x512.jpg' },
  { name: 'Iconik Layer', genre: 'Unisexe', couleur: 'Ecaille', forme: 'Ronde', matiere: 'Combine', extra: ['Oversize'], price: 175, image: './f_01-clifford-1-768x512.jpg' },
  { name: 'Sparkle Siena', genre: 'Femme', couleur: 'Or', forme: 'Carree', matiere: 'Metal', extra: [], price: 130, image: './f_01-seven-1-1-768x512.jpg' },
  { name: 'Dual Link', genre: 'Homme', couleur: 'Noir', forme: 'Pilote', matiere: 'Metal', extra: ['Polarisant'], price: 150, image: './01-cordier-1-768x512.jpg' },
  { name: 'Amalfi Curve', genre: 'Unisexe', couleur: 'Vert', forme: 'Ronde', matiere: 'Acetate', extra: [], price: 145, image: './f_01-tom-15-768x512.jpg' },
  { name: 'Legendre Atelier', genre: 'Homme', couleur: 'Noir', forme: 'Carree', matiere: 'Combine', extra: ['Polarisant'], price: 220, image: './h_01-legendre-1-1-768x512.jpg' },
  { name: 'Sully Lumiere', genre: 'Femme', couleur: 'Ecaille', forme: 'Papillon', matiere: 'Acetate', extra: ['Oversize'], price: 185, image: './f_01-sully-1-768x512.jpg' },
  { name: 'Ray Heritage', genre: 'Unisexe', couleur: 'Vert', forme: 'Pilote', matiere: 'Metal', extra: ['Polarisant'], price: 210, image: './h_01-ray-2-1-768x512.jpg' },
  { name: 'Auguste Prime', genre: 'Homme', couleur: 'Or', forme: 'Ronde', matiere: 'Metal', extra: [], price: 175, image: './h_01-auguste-2-768x512.jpg' },
  { name: 'Clifford Studio', genre: 'Femme', couleur: 'Noir', forme: 'Carree', matiere: 'Acetate', extra: [], price: 168, image: './f_01-clifford-1-768x512.jpg' },
  { name: 'Cordier Signature', genre: 'Unisexe', couleur: 'Ecaille', forme: 'Ronde', matiere: 'Combine', extra: ['Oversize'], price: 198, image: './01-cordier-1-768x512.jpg' },
  { name: 'Terry Optimise', genre: 'Homme', couleur: 'Vert', forme: 'Pilote', matiere: 'Metal', extra: ['Polarisant'], price: 230, image: './richard_modele-terry-optimised.jpg' },
  { name: 'Seven Contour', genre: 'Femme', couleur: 'Or', forme: 'Papillon', matiere: 'Combine', extra: ['Oversize'], price: 179, image: './f_01-seven-1-1-768x512.jpg' },
  { name: 'Tom Edition', genre: 'Unisexe', couleur: 'Noir', forme: 'Carree', matiere: 'Acetate', extra: ['Polarisant'], price: 188, image: './f_01-tom-15-768x512.jpg' }
];

async function main() {
  const db = await createDb();
  const cms = buildCmsService(db, env);

  const existing = await cms.listProducts();
  const bySlug = new Map(existing.map((item) => [String(item.slug), item]));

  let created = 0;
  let updated = 0;

for (const [idx, item] of seedProducts.entries()) {
    const slug = toSlug(item.name);
    const payload = {
      title: item.name,
      slug,
      category: 'Solaire',
      genre: item.genre,
      couleur: item.couleur,
      forme: item.forme,
      matiere: item.matiere,
      extra: item.extra,
      sort_order: idx + 1,
      price: item.price,
      currency: 'DH',
      stock: 8,
      image_url: item.image,
      gallery: [item.image],
      description: `${item.name} · ${item.genre} · ${item.forme} · ${item.matiere}`,
      active: true
    };

    const existingProduct = bySlug.get(slug);
    if (existingProduct) {
      const result = await cms.updateProduct(existingProduct.id, payload);
      if (result.ok) updated += 1;
    } else {
      const result = await cms.createProduct(payload);
      if (result.ok) created += 1;
    }
  }

  const all = await cms.listProducts();
  console.log(JSON.stringify({
    ok: true,
    created,
    updated,
    total_products: all.length,
    db_client: env.dbClient
  }, null, 2));

  if (db.client === 'postgres') {
    await db.raw.end();
  }
}

main().catch((error) => {
  console.error('[seed-products] failed:', error && error.message ? error.message : String(error));
  process.exit(1);
});
