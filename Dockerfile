# Imagem do front-end para Kubernetes: os estáticos vão DENTRO da imagem.
# O docker-compose serve src/ por bind mount em /goinfre/front-end-dev — em k8s não
# existe bind mount, então o conteúdo precisa estar na imagem.
#
# Diferenças em relação a nginx/Dockerfile (o do compose):
#  · não gera certificado nem termina TLS: quem faz isso é o Ingress;
#  · não faz proxy das APIs: quem roteia é o Ingress (manifests/60-ingress.yaml);
#  · a configuração vem do ConfigMap `front-end-nginx`, montada em /etc/nginx/conf.d.
FROM docker.io/library/nginx:1.27-alpine

# Remove a config padrão para não competir com a do ConfigMap.
RUN rm -f /etc/nginx/conf.d/default.conf

COPY src/ /usr/share/nginx/html/

EXPOSE 80

# nginx:alpine já traz CMD e roda o master como root para abrir a :80 — mantido,
# porque os workers baixam para o usuário nginx.
