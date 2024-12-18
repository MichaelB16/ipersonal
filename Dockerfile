FROM node:20-alpine AS develop-stage
WORKDIR /app
COPY package.json ./

RUN npm -g cache clean --force && npm install

COPY . .
#build
FROM develop-stage AS build-stage
RUN npm install -g @vue/cli && npm i -g @quasar/cli
RUN quasar build

#product
FROM nginx:1.27.0-alpine AS production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
