FROM node:10-alpine

WORKDIR /opt/app

COPY package*.json ./
RUN npm install

COPY . .
ENV WAIFU_TIERLIST_URL=https://waifu.hifumi.io
RUN npm run build

CMD npm start
