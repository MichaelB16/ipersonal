# Stage de desenvolvimento
FROM node:20-alpine AS develop-stage
WORKDIR /app

# Copiar somente os arquivos necessários para instalar dependências
COPY package.json package-lock.json ./

# Limpar cache e instalar as dependências
RUN npm cache clean --force && npm install

# Copiar o código fonte
COPY . .

# Stage de build
FROM develop-stage AS build-stage
# Instalar as dependências globais necessárias e fazer o build
RUN npm install -g @vue/cli @quasar/cli && quasar build

# Stage de produção
FROM nginx:1.27.0-alpine AS production-stage
# Copiar os arquivos de build para o Nginx
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html

# Expor a porta
EXPOSE 3000

# Rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
