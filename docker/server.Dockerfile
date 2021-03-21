FROM node:14-alpine

LABEL IGNIS DIGITAL

ENV NODE_ENV=development

WORKDIR /var/www

COPY . /var/www

RUN npm install

CMD [ "npm","run","dev:server" ]

EXPOSE 5000
