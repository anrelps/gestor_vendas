#!/bin/bash
set -e

PORT=${PORT:-8080}

# Substitui a porta no nginx.conf
sed -i "s/PORT_PLACEHOLDER/${PORT}/" /etc/nginx/sites-available/default

# Garante permissões no storage
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Cria o .env a partir das variáveis de ambiente se não existir
if [ ! -f /var/www/.env ]; then
    cp /var/www/.env.example /var/www/.env
fi

# Injeta as variáveis de ambiente no .env
cat > /var/www/.env <<EOF
APP_NAME=${APP_NAME:-GestorVendas}
APP_ENV=${APP_ENV:-production}
APP_KEY=${APP_KEY}
APP_DEBUG=${APP_DEBUG:-false}
APP_URL=${APP_URL:-http://localhost}

LOG_CHANNEL=stderr
LOG_LEVEL=error

DB_CONNECTION=pgsql
DB_HOST=${DB_HOST:-${PGHOST}}
DB_PORT=${DB_PORT:-${PGPORT:-5432}}
DB_DATABASE=${DB_DATABASE:-${PGDATABASE}}
DB_USERNAME=${DB_USERNAME:-${PGUSER}}
DB_PASSWORD=${DB_PASSWORD:-${PGPASSWORD}}

SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_PATH=/
SESSION_DOMAIN=

CACHE_STORE=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
BROADCAST_CONNECTION=log

FRONTEND_URL=${FRONTEND_URL}
EOF

# Gera APP_KEY se não estiver definida
if [ -z "$APP_KEY" ]; then
    php /var/www/artisan key:generate --force
fi

# Roda migrations
php /var/www/artisan migrate --force

# Limpa e otimiza caches
php /var/www/artisan config:cache
php /var/www/artisan route:cache

exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
