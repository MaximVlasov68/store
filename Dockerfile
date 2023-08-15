FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD [ "npm", "run", "start:dev" ]