FROM node:latest

RUN mkdir /proxy
WORKDIR /proxy
COPY . /proxy

RUN npm install

CMD [ "npm", "start" ]