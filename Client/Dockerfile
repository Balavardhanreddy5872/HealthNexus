FROM node:18

WORKDIR /Client

COPY package.json ./

RUN npm install

COPY . .

COPY .env ./

EXPOSE 3000

CMD ["npm", "run", "start"]