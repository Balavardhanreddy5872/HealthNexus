FROM node

WORKDIR /server

COPY package.json ./

RUN npm install

COPY . .

COPY .env ./

EXPOSE 8081

CMD ["node", "server.js"]