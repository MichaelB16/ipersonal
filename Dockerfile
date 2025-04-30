# Stage de build
FROM node:20-alpine AS build-stage
WORKDIR /app

# Dependências do sistema
RUN apk add --no-cache python3 make g++

# Instala dependências
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit --progress=false

# Copia código-fonte e gera build
COPY . .
RUN npx quasar build

# Stage de produção
FROM nginx:1.27.0-alpine AS production-stage

# Copia o build para o Nginx
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
