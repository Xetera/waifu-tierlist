FROM node:10-alpine

WORKDIR /opt/app

COPY package*.json ./
RUN npm install

COPY . .
ENV WAIFU_TIERLIST_URL=https://waifu.hifumi.io
ARG DATABASE_URL
ENV WAIFU_TIERLIST_DATABASE_URL=$DATABASE_URL
RUN npm run build

CMD npm start
