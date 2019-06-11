FROM node:10 as build

WORKDIR /opt/app

COPY package*.json ./
RUN npm install

COPY . .
ENV WAIFU_TIERLIST_URL=https://waifu.hifumi.io
RUN npm run build

# Stage 2
FROM node:10-alpine
COPY --from=build /opt/app/ /

CMD npm start
