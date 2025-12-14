FROM node:20-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build authentication
RUN npm run build gateway

CMD ["node","dist/apps/gateway/main"]