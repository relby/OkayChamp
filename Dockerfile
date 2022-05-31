FROM node:16

WORKDIR /usr/app

COPY package*.json ./

RUN npm install && npm install -g typescript

COPY . ./

RUN npm run build

CMD ["npm", "run", "start:prod"]