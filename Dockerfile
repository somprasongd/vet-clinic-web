# Dockerfile
FROM node:12.18.4-alpine

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
EXPOSE 3000

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# # update and install dependency
# RUN apk update && apk upgrade
# RUN apk add git

# install dependencies
COPY package*.json ./
RUN npm ci

# build
COPY ./ ./
RUN npm run build

CMD [ "npm", "start" ]