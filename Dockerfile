FROM node:14.17.5-stretch-slim
WORKDIR app
COPY . .
RUN npm install
ENTRYPOINT npm start
