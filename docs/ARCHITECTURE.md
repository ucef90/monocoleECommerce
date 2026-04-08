# Architecture technique

## 1) Frontend

Pages statiques servies par le backend:
- `index.html`: homepage + popup newsletter
- `collection.html`: page solaire
- `collections.html`: page collection visuelle
- `sur-mesure.html`: tunnel conversion + sticky CTA + slots

## 2) Backend

Localisation: `backend/src`

- `server.js`: serveur HTTP + routage API + service fichiers statiques
- `routes/api.js`: endpoints REST
- `db/database.js`: connexion SQLite/PostgreSQL + migrations au boot
- `services/slots.service.js`: logique créneaux journaliers
- `services/newsletter.service.js`: inscription newsletter
- `services/auth.service.js`: auth admin (session signée)
- `config/env.js`: configuration runtime
- `utils/http.js`: utilitaires réponse HTTP / parse JSON
- `utils/cookies.js`: gestion cookies HTTP

## 3) Base de données (SQLite + PostgreSQL)

Tables:
- `slots_inventory(day, total, remaining, updated_at)`
- `newsletter_subscribers(id, email, source, discount_code, created_at)`

Migration SQL initiale:
- `backend/migrations/001_init.sql`
- `backend/migrations-postgres/001_init.sql`

## 4) Admin dashboard

- `GET /admin/login`: page de connexion admin
- `GET /admin`: dashboard newsletter
- Auth via cookie `HttpOnly` signé (`monocle_admin`)
- Export CSV via `GET /api/admin/newsletter/export.csv`

## 5) Industrialisation appliquée

- Séparation logique frontend/backend/database
- Migrations versionnées
- Endpoints API explicites
- Configuration via variables d'environnement
- Persistance robuste (SQLite local / PostgreSQL cloud)
- Déploiement containerisé (`Dockerfile`, `docker-compose.yml`)
