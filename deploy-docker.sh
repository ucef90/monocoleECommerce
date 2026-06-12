#!/usr/bin/env bash
###############################################################################
# Monocle eCommerce - Déploiement Docker derrière Caddy
# Cible : VPS Ubuntu avec stack Docker + Caddy déjà en place
#
# Pré-requis :
#   - Docker + docker compose installés (ils le sont déjà sur ton VPS)
#   - Caddy tourne dans le conteneur `proxy-caddy-1` sur le réseau `web`
#
# Usage : bash deploy-docker.sh
###############################################################################

set -euo pipefail

# ============================================================================
# >>> CONFIGURATION À ÉDITER <<<
# ============================================================================
ADMIN_PASSWORD="ChangeMoiMotDePasseFort"
APP_DIR="/home/ubuntu/monocle"
CADDY_DIR="/home/ubuntu/New-AI-DecisionNavigator/deploy/proxy"
DOMAIN="monocle-eyewear.com"
WWW_DOMAIN="www.monocle-eyewear.com"
# ============================================================================

REPO_URL="https://github.com/ucef90/monocoleECommerce.git"
GREEN="\033[0;32m"; RED="\033[0;31m"; YELLOW="\033[1;33m"; NC="\033[0m"
log()  { echo -e "${GREEN}[OK]${NC} $*"; }
warn() { echo -e "${YELLOW}[!!]${NC} $*"; }
err()  { echo -e "${RED}[KO]${NC} $*" >&2; }

if [ "$ADMIN_PASSWORD" = "ChangeMoiMotDePasseFort" ]; then
  err "Édite ADMIN_PASSWORD en haut du script."
  exit 1
fi

# ---------------------------------------------------------------------------
# 1. Récupération / mise à jour du code
# ---------------------------------------------------------------------------
# Si l'ancien clone est dans /var/www/monocle, on le déplace
if [ -d "/var/www/monocle/.git" ] && [ ! -d "$APP_DIR/.git" ]; then
  log "Déplacement de /var/www/monocle vers $APP_DIR..."
  sudo mv /var/www/monocle "$APP_DIR"
  sudo chown -R "$USER":"$USER" "$APP_DIR"
fi

if [ -d "$APP_DIR/.git" ]; then
  log "Mise à jour du repo..."
  cd "$APP_DIR" && git pull
else
  log "Clonage du repo dans $APP_DIR..."
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

# ---------------------------------------------------------------------------
# 2. Patch Dockerfile : node:20-alpine -> node:22-alpine (built-in sqlite)
# ---------------------------------------------------------------------------
if grep -q "node:20-alpine" "$APP_DIR/Dockerfile"; then
  log "Patch Dockerfile : node:20-alpine -> node:22-alpine"
  sed -i 's|node:20-alpine|node:22-alpine|' "$APP_DIR/Dockerfile"
fi

# ---------------------------------------------------------------------------
# 3. docker-compose de production (override l'existant)
# ---------------------------------------------------------------------------
SESSION_SECRET="$(openssl rand -hex 32)"

cat > "$APP_DIR/docker-compose.prod.yml" <<EOF
services:
  monocle:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: monocle
    restart: unless-stopped
    environment:
      PORT: 8787
      DB_CLIENT: sqlite
      DB_PATH: /app/backend/data/monocle.sqlite
      STATIC_DIR: /app
      UPLOAD_DIR: /app/uploads
      ADMIN_USERNAME: admin
      ADMIN_PASSWORD: "$ADMIN_PASSWORD"
      ADMIN_SESSION_SECRET: "$SESSION_SECRET"
      ADMIN_SESSION_HOURS: 12
      DAILY_SLOT_TOTAL: 12
      DAILY_SLOT_MIN: 4
    volumes:
      - monocle_data:/app/backend/data
      - monocle_uploads:/app/uploads
    networks:
      - web
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://localhost:8787/api/health | grep -q '\"ok\":true'"]
      interval: 30s
      timeout: 5s
      retries: 5
      start_period: 20s

volumes:
  monocle_data:
  monocle_uploads:

networks:
  web:
    external: true
EOF
log "docker-compose.prod.yml généré"

# ---------------------------------------------------------------------------
# 4. Build + lancement du conteneur
# ---------------------------------------------------------------------------
log "Build de l'image Monocle (peut prendre 1-2 min)..."
cd "$APP_DIR"
sudo docker compose -f docker-compose.prod.yml build

log "Démarrage du conteneur monocle..."
sudo docker compose -f docker-compose.prod.yml up -d

# Attente health
log "Attente que Monocle réponde..."
for i in {1..30}; do
  if sudo docker exec monocle wget -qO- http://localhost:8787/api/health 2>/dev/null | grep -q '"ok":true'; then
    log "Monocle répond ✓"
    break
  fi
  sleep 2
done

# ---------------------------------------------------------------------------
# 5. Ajout du bloc dans le Caddyfile
# ---------------------------------------------------------------------------
CADDYFILE="$CADDY_DIR/Caddyfile"
if [ ! -f "$CADDYFILE" ]; then
  err "Caddyfile introuvable à $CADDYFILE"
  err "Édite la variable CADDY_DIR en haut du script."
  exit 1
fi

if grep -q "$DOMAIN" "$CADDYFILE"; then
  warn "Bloc $DOMAIN déjà présent dans Caddyfile — skip."
else
  log "Ajout du bloc $DOMAIN au Caddyfile..."
  sudo tee -a "$CADDYFILE" >/dev/null <<EOF

# ── $DOMAIN — Monocle eCommerce (service "monocle") ──
$WWW_DOMAIN {
	redir https://$DOMAIN{uri} permanent
}

$DOMAIN {
	encode zstd gzip
	reverse_proxy monocle:8787
}
EOF
fi

# ---------------------------------------------------------------------------
# 6. Reload Caddy
# ---------------------------------------------------------------------------
log "Reload de Caddy..."
sudo docker exec proxy-caddy-1 caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile

# ---------------------------------------------------------------------------
# Résumé
# ---------------------------------------------------------------------------
echo
echo "============================================================"
echo "  DÉPLOIEMENT TERMINÉ"
echo "============================================================"
echo "  Code        : $APP_DIR"
echo "  Compose     : $APP_DIR/docker-compose.prod.yml"
echo "  Caddyfile   : $CADDYFILE"
echo ""
echo "  Site        : https://$DOMAIN/"
echo "  Site (www)  : https://$WWW_DOMAIN/"
echo "  Admin       : https://$DOMAIN/admin/login"
echo "  Login       : admin / $ADMIN_PASSWORD"
echo ""
echo "  Logs        : sudo docker logs -f monocle"
echo "  Restart     : sudo docker compose -f $APP_DIR/docker-compose.prod.yml restart"
echo "  Update code : cd $APP_DIR && git pull && sudo docker compose -f docker-compose.prod.yml up -d --build"
echo "============================================================"
