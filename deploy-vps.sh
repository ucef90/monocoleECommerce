#!/usr/bin/env bash
###############################################################################
# Monocle eCommerce - Script de déploiement VPS Ubuntu
# Domaine : monocle-eyewear.com
# Stack   : Node.js 20 + PM2 + Nginx + Let's Encrypt
###############################################################################

set -euo pipefail

# ============================================================================
# >>> CONFIGURATION À ÉDITER <<<
# ============================================================================
DOMAIN="monocle-eyewear.com"
WWW_DOMAIN="www.monocle-eyewear.com"
ADMIN_PASSWORD="ChangeMoiMotDePasseFort"     # Mot de passe admin CMS
ADMIN_EMAIL="youssefelmoutee@gmail.com"      # Pour Let's Encrypt
# ============================================================================

APP_NAME="monocle"
APP_DIR="/var/www/monocle"
REPO_URL="https://github.com/ucef90/monocoleECommerce.git"
DEFAULT_PORT=8787

GREEN="\033[0;32m"; RED="\033[0;31m"; YELLOW="\033[1;33m"; NC="\033[0m"
log()  { echo -e "${GREEN}[OK]${NC} $*"; }
warn() { echo -e "${YELLOW}[!!]${NC} $*"; }
err()  { echo -e "${RED}[KO]${NC} $*" >&2; }

# ---------------------------------------------------------------------------
# 0. Sanity check
# ---------------------------------------------------------------------------
if [ "$ADMIN_PASSWORD" = "ChangeMoiMotDePasseFort" ]; then
  err "Édite ADMIN_PASSWORD en haut du script avant de l'exécuter."
  exit 1
fi
if [ "$EUID" -eq 0 ]; then
  warn "Lancement en root."
  SUDO=""
else
  SUDO="sudo"
fi

# ---------------------------------------------------------------------------
# 1. Mise à jour + paquets de base
# ---------------------------------------------------------------------------
log "Mise à jour des paquets..."
$SUDO apt-get update -y
$SUDO apt-get install -y curl git build-essential nginx ufw

# ---------------------------------------------------------------------------
# 2. Node.js 20
# ---------------------------------------------------------------------------
if ! command -v node >/dev/null 2>&1; then
  log "Installation de Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | $SUDO -E bash -
  $SUDO apt-get install -y nodejs
else
  log "Node déjà présent : $(node -v)"
fi

# ---------------------------------------------------------------------------
# 3. PM2
# ---------------------------------------------------------------------------
if ! command -v pm2 >/dev/null 2>&1; then
  log "Installation de PM2..."
  $SUDO npm install -g pm2
else
  log "PM2 déjà présent : $(pm2 -v)"
fi

# ---------------------------------------------------------------------------
# 4. Trouve un port libre (évite conflit avec les 2 SAAS existants)
# ---------------------------------------------------------------------------
PORT=$DEFAULT_PORT
while $SUDO ss -tln "sport = :$PORT" 2>/dev/null | grep -q LISTEN; do
  warn "Port $PORT occupé, on essaie $((PORT+1))"
  PORT=$((PORT+1))
done
log "Port interne choisi : $PORT"

# ---------------------------------------------------------------------------
# 5. Clone / pull
# ---------------------------------------------------------------------------
if [ -d "$APP_DIR/.git" ]; then
  log "Repo déjà cloné, on met à jour..."
  cd "$APP_DIR" && git pull
else
  log "Clonage dans $APP_DIR..."
  $SUDO mkdir -p "$APP_DIR"
  $SUDO chown -R "$USER":"$USER" "$APP_DIR"
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

# ---------------------------------------------------------------------------
# 6. npm install
# ---------------------------------------------------------------------------
log "Installation des dépendances npm..."
cd "$APP_DIR"
npm install --omit=dev || npm install

# ---------------------------------------------------------------------------
# 7. .env
# ---------------------------------------------------------------------------
SESSION_SECRET="$(openssl rand -hex 32)"
mkdir -p "$APP_DIR/backend/data" "$APP_DIR/uploads"

cat > "$APP_DIR/backend/.env" <<EOF
PORT=$PORT
DB_CLIENT=sqlite
DB_PATH=$APP_DIR/backend/data/monocle.sqlite
STATIC_DIR=$APP_DIR
UPLOAD_DIR=$APP_DIR/uploads
DAILY_SLOT_TOTAL=10
DAILY_SLOT_MIN=2
ADMIN_USERNAME=admin
ADMIN_PASSWORD=$ADMIN_PASSWORD
ADMIN_SESSION_SECRET=$SESSION_SECRET
ADMIN_SESSION_HOURS=12
EOF
chmod 600 "$APP_DIR/backend/.env"
log ".env généré (mode 600)"

# ---------------------------------------------------------------------------
# 8. PM2
# ---------------------------------------------------------------------------
cd "$APP_DIR"
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  log "App PM2 existante, reload..."
  pm2 reload "$APP_NAME" --update-env
else
  log "Démarrage de $APP_NAME via PM2..."
  pm2 start npm --name "$APP_NAME" -- start
fi
pm2 save

if ! systemctl is-enabled "pm2-$USER" >/dev/null 2>&1; then
  warn "PM2 startup pas configuré. Lance ensuite la commande affichée par :"
  warn "  pm2 startup systemd -u $USER --hp $HOME"
fi

# ---------------------------------------------------------------------------
# 9. Nginx vhost
# ---------------------------------------------------------------------------
NGINX_CONF="/etc/nginx/sites-available/$APP_NAME"
log "Écriture du vhost Nginx : $NGINX_CONF"

$SUDO tee "$NGINX_CONF" >/dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN $WWW_DOMAIN;

    client_max_body_size 25M;

    access_log /var/log/nginx/${APP_NAME}_access.log;
    error_log  /var/log/nginx/${APP_NAME}_error.log;

    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 60s;
    }
}
EOF

$SUDO ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/$APP_NAME"
$SUDO nginx -t
$SUDO systemctl reload nginx
log "Nginx configuré : $DOMAIN + $WWW_DOMAIN -> 127.0.0.1:$PORT"

# ---------------------------------------------------------------------------
# 10. Pare-feu
# ---------------------------------------------------------------------------
if $SUDO ufw status | grep -q "Status: active"; then
  log "UFW actif, on autorise Nginx Full (80 + 443)..."
  $SUDO ufw allow 'Nginx Full' || true
fi

# ---------------------------------------------------------------------------
# 11. HTTPS Let's Encrypt
# ---------------------------------------------------------------------------
if ! command -v certbot >/dev/null 2>&1; then
  log "Installation de certbot..."
  $SUDO apt-get install -y certbot python3-certbot-nginx
fi

log "Demande du certificat SSL pour $DOMAIN + $WWW_DOMAIN..."
if $SUDO certbot --nginx -d "$DOMAIN" -d "$WWW_DOMAIN" \
     --non-interactive --agree-tos -m "$ADMIN_EMAIL" --redirect; then
  log "HTTPS activé !"
else
  warn "Certbot a échoué. Vérifie :"
  warn "  - DNS A record $DOMAIN -> 164.132.41.177 (propagé ?)"
  warn "  - DNS A record $WWW_DOMAIN -> 164.132.41.177"
  warn "Tu pourras relancer plus tard :"
  warn "  sudo certbot --nginx -d $DOMAIN -d $WWW_DOMAIN"
fi

# ---------------------------------------------------------------------------
# 12. Backup quotidien
# ---------------------------------------------------------------------------
BACKUP_SCRIPT="/etc/cron.daily/${APP_NAME}-backup"
$SUDO tee "$BACKUP_SCRIPT" >/dev/null <<EOF
#!/bin/bash
BACKUP_DIR=/var/backups/$APP_NAME
mkdir -p \$BACKUP_DIR
DATE=\$(date +%Y%m%d)
cp $APP_DIR/backend/data/monocle.sqlite \$BACKUP_DIR/monocle-\$DATE.sqlite 2>/dev/null || true
tar czf \$BACKUP_DIR/uploads-\$DATE.tar.gz -C $APP_DIR uploads 2>/dev/null || true
find \$BACKUP_DIR -type f -mtime +14 -delete
EOF
$SUDO chmod +x "$BACKUP_SCRIPT"
log "Backup quotidien programmé : $BACKUP_SCRIPT"

# ---------------------------------------------------------------------------
# 13. Vérification finale
# ---------------------------------------------------------------------------
sleep 2
if curl -fs "http://127.0.0.1:$PORT/api/health" >/dev/null; then
  log "Monocle répond en local sur le port $PORT ✓"
else
  err "Monocle ne répond pas. Vérifie : pm2 logs $APP_NAME"
fi

# ---------------------------------------------------------------------------
# Résumé
# ---------------------------------------------------------------------------
echo
echo "============================================================"
echo "  DÉPLOIEMENT TERMINÉ"
echo "============================================================"
echo "  App         : $APP_NAME"
echo "  Dossier     : $APP_DIR"
echo "  Port interne: $PORT (proxifié par Nginx)"
echo ""
echo "  Site        : https://$DOMAIN/"
echo "  Site (www)  : https://$WWW_DOMAIN/"
echo "  Admin       : https://$DOMAIN/admin/login"
echo "  Login       : admin / $ADMIN_PASSWORD"
echo ""
echo "  Logs        : pm2 logs $APP_NAME"
echo "  Restart     : pm2 restart $APP_NAME"
echo "  Update code : cd $APP_DIR && git pull && pm2 restart $APP_NAME"
echo "  Backup      : $BACKUP_SCRIPT (quotidien)"
echo "============================================================"
