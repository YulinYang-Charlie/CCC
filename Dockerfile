FROM node:latest as frontend
WORKDIR /usr/src/app
COPY frontend .
RUN npm install
RUN npm run build