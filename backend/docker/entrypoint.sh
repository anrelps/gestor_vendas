#!/bin/bash
set -e

PORT=${PORT:-8080}

sed -i "s/PORT_PLACEHOLDER/${PORT}/" /etc/nginx/sites-available/default

chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

cat > /var/www/.env <<EOF
APP_NAME=${APP_NAME:-GestorVendas}
APP_ENV=${APP_ENV:-production}
APP_KEY=${APP_KEY}
APP_DEBUG=${APP_DEBUG:-false}
APP_URL=${APP_URL:-http://localhost}

LOG_CHANNEL=stderr
LOG_LEVEL=error

DB_CONNECTION=pgsql
DB_HOST=${DB_HOST}
DB_PORT=${DB_PORT:-5432}
DB_DATABASE=${DB_DATABASE}
DB_USERNAME=${DB_USERNAME}
DB_PASSWORD=${DB_PASSWORD}

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

php /var/www/artisan migrate --force

php /var/www/artisan config:cache
php /var/www/artisan route:cache

exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
