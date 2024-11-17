FROM nginx:latest

# Geração do certificado SSL durante a construção da imagem
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

# Copiar o arquivo de configuração do Nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf
