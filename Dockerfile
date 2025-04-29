# Stage de build
FROM node:20-alpine AS build-stage
WORKDIR /app

# Instala dependências do sistema para build
RUN apk add --no-cache python3 make g++

# Copia e instala dependências com cache otimizado
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit --progress=false

# Copia o restante do projeto
COPY . .

# Faz o build
RUN npx quasar build

# Stage de produção
FROM nginx:1.27.0-alpine AS production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
