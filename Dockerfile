FROM node:20-alpine AS develop-stage
WORKDIR /app
COPY package.json ./
COPY . .

RUN npm install && npm cache clean --force
RUN npm i --target_arch=x64 --target_platform=linux
RUN npm i -g @quasar/cli && quasar build

FROM develop-stage AS build-stage

FROM nginx:1.27.0-alpine AS production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 9000
CMD ["nginx", "-g", "daemon off;"]
