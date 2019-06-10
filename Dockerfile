FROM node:10 as build

WORKDIR /opt/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm build

FROM node:10-alpine
COPY --from=build /opt/app/node_modules /node_modules
COPY --from=build /opt/app/dist /dist

CMD npm start
