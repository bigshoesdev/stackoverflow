FROM node:18-alpine

WORKDIR /app

RUN npm install -g ts-node nodemon

COPY package*.json ./
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:feed"]
