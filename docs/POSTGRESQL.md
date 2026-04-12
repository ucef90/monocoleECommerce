# PostgreSQL Runtime (optionnel)

Le projet supporte aussi PostgreSQL côté runtime:
- `docker-compose.postgres.yml`
- `backend/migrations-postgres/001_init.sql`
- `backend/src/db/database.js` (connexion + migrations)
- services dual DB (`sqlite` / `postgres`)

## Lancer l'infra PostgreSQL

```bash
cd monancle
docker compose -f docker-compose.postgres.yml up --build
```

## Variables nécessaires

```env
DB_CLIENT=postgres
POSTGRES_URL=postgres://monocle:monocle@postgres:5432/monocle
```

## Validation minimale

- `GET /api/health` doit retourner `"dbClient":"postgres"`
- `POST /api/newsletter/subscribe` doit écrire dans la table `newsletter_subscribers`
- `GET /api/slots` / `POST /api/slots/reserve` doivent opérer sur `slots_inventory`
