FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

CMD [ "npm", "run", "dev" ]