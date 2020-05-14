FROM node:alpine

WORKDIR /app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm install

COPY . .

EXPOSE 2000

CMD ["node", "songInfo.js"]
