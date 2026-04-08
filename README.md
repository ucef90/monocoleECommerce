# Monocle - Structure industrialisée (Frontend + Backend + SQLite/PostgreSQL)

Ce projet est structuré avec:
- un frontend statique (pages HTML/CSS/JS)
- un backend Node.js (API)
- une base de données SQLite persistante
- une base PostgreSQL supportée en runtime (driver + requêtes live)

## Arborescence

- `index.html`, `collection.html`, `collections.html`, `sur-mesure.html`: pages frontend
- `backend/src`: code backend
- `backend/migrations`: schéma SQL versionné
- `backend/data/monocle.sqlite`: base SQLite
- `backend/migrations-postgres`: schéma PostgreSQL
- `admin/login.html`, `admin/index.html`: interface admin CMS (newsletter + produits + contenu + médias)
- `package.json`: scripts de lancement

## API disponible

- `GET /api/health`
- `GET /api/slots`
- `POST /api/slots/reserve`
- `POST /api/newsletter/subscribe`
- `GET /api/newsletter/stats`
- `GET /api/products`
- `GET /api/content`
- `GET /api/content/:key`
- `GET /api/media`
- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /api/admin/session`
- `GET /api/admin/newsletter/stats`
- `GET /api/admin/newsletter/list`
- `GET /api/admin/newsletter/export.csv`
- `GET /api/admin/products`
- `POST /api/admin/products`
- `PUT|PATCH /api/admin/products/:id`
- `DELETE /api/admin/products/:id`
- `GET /api/admin/content`
- `GET /api/admin/content/:key`
- `PUT|PATCH /api/admin/content/:key`
- `GET /api/admin/media`
- `POST /api/admin/media/upload`
- `DELETE /api/admin/media/:id`

## Démarrage

```bash
cd monancle
npm start
```

Ouvrir ensuite:
- `http://localhost:8787/index.html`
- `http://localhost:8787/admin/login`

## Configuration

Copier les variables d'exemple si nécessaire:
- `backend/.env.example`

Variables supportées:
- `PORT`
- `DB_CLIENT`
- `DB_PATH`
- `POSTGRES_URL`
- `STATIC_DIR`
- `UPLOAD_DIR`
- `DAILY_SLOT_TOTAL`
- `DAILY_SLOT_MIN`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `ADMIN_SESSION_HOURS`

## Notes

- Le popup newsletter de la home enregistre l'email via l'API backend (`newsletter_subscribers`).
- Le compteur de créneaux lit/réserve via l'API `/api/slots`.
- Les services fonctionnent avec `DB_CLIENT=sqlite` ou `DB_CLIENT=postgres`.
- Un mini CMS backend est disponible pour gérer produits, contenus de pages et médias uploadés.
- Dans l'admin produits, les taxonomies filtres (`catégorie`, `genre`, `couleur`, `forme`, `matière`, `extras`) sont pilotables:
  - choisir une valeur existante
  - ou sélectionner `+ Ajouter nouveau` pour créer une nouvelle valeur directement
- L'ordre des produits est pilotable depuis l'admin:
  - champ `Position` dans le formulaire produit
  - boutons `Monter` / `Descendre` dans la liste produits
- La page `collection.html` et `collections.html` lisent les produits depuis `/api/products` (fallback statique si API indisponible).
- La home (`index.html`) peut être pilotée depuis le CMS via les clés de contenu:
  - `home-hero`
  - `home-quote`
  - `home-stores`
- Navigation/labels globaux pilotables via:
  - `site-nav`
- La page `collection.html` peut être pilotée via:
  - `collection-meta`
  - `collection-hero`
- La page `collections.html` peut être pilotée via:
  - `collections-meta`
  - `collections-hero`
- La page `sur-mesure.html` peut être pilotée via:
  - `surmesure-meta` (topbar + footer)
  - `surmesure-hero` (hero image + titre + texte + CTA/sticky)
  - `surmesure-offer` (bloc offre + sticky)
  - `surmesure-story` (image + promesse)
  - `surmesure-final` (CTA final)

Exemple `home-hero` (admin contenu):
```json
{
  "title": "Des lunettes sur mesure, pensées pour votre visage.",
  "body": "Texte marketing principal...",
  "data": {
    "eyebrow": "Lunetterie sur mesure",
    "image_url": "/uploads/hero.jpg",
    "cta_primary_label": "Explorer les montures",
    "cta_primary_url": "/collection.html",
    "cta_secondary_label": "Découvrir l'expérience",
    "cta_secondary_url": "#surmesure"
  }
}
```

Exemple `surmesure-hero` (admin contenu):
```json
{
  "title": "Une monture pensée pour vous, pas pour tout le monde.",
  "body": "Texte principal du hero...",
  "data": {
    "kicker": "Le sur-mesure",
    "image_url": "/uploads/sur-mesure-hero.jpg",
    "cta_label": "Réserver ma consultation",
    "cta_href": "/collection.html",
    "sticky_msg": "Découvrez le sur-mesure Monocle avec un accompagnement premium."
  }
}
```

Exemple `site-nav` (admin contenu):
```json
{
  "title": "Navigation globale",
  "body": "",
  "data": {
    "topline": "Maison de lunetterie artisanale · Casablanca",
    "topline_surmesure": "Le Sur-Mesure Monocle · Art, confort, précision",
    "home_label": "La Maison",
    "custom_label": "Le sur-mesure",
    "collections_label": "Collections",
    "solar_label": "Solaire",
    "ateliers_label": "Ateliers",
    "cta_label": "Prendre rendez-vous",
    "collections_cta_label": "Voir Solaire",
    "footer_text": "MONOCLE · Lunettes sur mesure · Casablanca"
  }
}
```

Exemple upload média (base64):
```json
POST /api/admin/media/upload
{
  "filename": "nouvelle-photo.jpg",
  "mime_type": "image/jpeg",
  "data_base64": "...."
}
```

## Docker

Mode SQLite:
```bash
docker compose up --build
```

Mode PostgreSQL (préparation infra):
```bash
docker compose -f docker-compose.postgres.yml up --build
```

Durcissement appliqué:
- `restart: unless-stopped`
- `healthcheck` sur `app`
- `healthcheck` sur `postgres` + `depends_on: condition: service_healthy`

## Production env

Fichier prêt:
- `.env.production`

À adapter avant déploiement:
- `POSTGRES_URL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
