# Stage de build
FROM node:20-alpine AS build-stage
WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit --progress=false

COPY . .
RUN npx quasar build

# Stage de produção
FROM nginx:1.27.0-alpine AS production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
