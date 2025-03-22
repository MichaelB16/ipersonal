# Stage de build
FROM node:20-alpine AS build-stage
WORKDIR /app

# Copia apenas arquivos de dependência para cache otimizado
COPY package.json package-lock.json ./

# Instala as dependências necessárias para build e remove cache
RUN npm ci --prefer-offline --no-audit --progress=false

# Copia o restante do código
COPY . .

# Faz o build usando npx (evita global)
RUN npx quasar build

# Stage de produção final
FROM nginx:1.27.0-alpine AS production-stage

# Copia o build final pro Nginx
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html

# Expor a porta padrão do Nginx
EXPOSE 80

# Comando padrão
CMD ["nginx", "-g", "daemon off;"]
