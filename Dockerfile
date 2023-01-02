# Check out https://hub.docker.com/_/node to select a new base image
FROM node:16-slim as dev

RUN npm i -g @loopback/cli

# Create app directory (with user `node`)
RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm install

# Bundle app source code
COPY . .

RUN npm run build

EXPOSE ${PORT}

RUN yarn run rebuild

CMD [ "node","-r","source-map-support/register","."]