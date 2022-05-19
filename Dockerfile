FROM node:16-alpine

WORKDIR /app

RUN npm install pm2 -g

COPY package*.json ./

RUN npm ci

RUN npm run build

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["pm2-runtime", "ecosystem.config.js"]
