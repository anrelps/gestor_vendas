FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpq-dev \
    libonig-dev \
    libzip-dev \
    zlib1g-dev \
    libpng-dev \
    libwebp-dev \
    libjpeg62-turbo-dev \
    zip \
    unzip

RUN docker-php-ext-configure gd --with-jpeg --with-webp && docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --optimize-autoloader --no-dev

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
