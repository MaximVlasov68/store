FROM node:14-alpine3.10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]