FROM node:18.10.0 AS node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

EXPOSE 4200

CMD ["npm", "start"]