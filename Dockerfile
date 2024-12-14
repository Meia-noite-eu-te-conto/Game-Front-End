FROM nginx:latest

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

RUN if [ ! -f /etc/ssl/certs/certificate.pem ]; then \
    openssl req \
    -x509 \
    -newkey rsa:4096 \
    -sha256 \
    -days 365 \
    -nodes \
    -keyout /etc/ssl/private/certificate.key.pem \
    -out /etc/ssl/certs/certificate.pem \
    -subj "/C=BR/ST=SP/L=Itaquera/O=42/OU=42/CN=dapaulin@42.fr"; \
    fi

COPY ./src/ /usr/share/nginx/html

EXPOSE 80
EXPOSE 443
