FROM node

WORKDIR /app
COPY package.json .
COPY app.js .

RUN npm install
CMD node app.js