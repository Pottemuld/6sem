FROM node:alpine

WORKDIR /Website

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

ENV PATH ./node_modules/.bin:$PATH

RUN npm install
RUN npm install react-scripts

COPY . .

CMD ["npm", "start"]