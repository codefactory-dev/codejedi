FROM node:8.7.0-alpine

# Create app directory and use it as the working directory
RUN mkdir -p /srv/app/admin-server
WORKDIR /srv/app/admin-server
ENV MONGODB_URL "mongodb://mongo:27017/codefactory-database"

COPY package.json /srv/app/admin-server
COPY package-lock.json /srv-app/admin-server

RUN npm install --silent

COPY . /srv/app/admin-server

CMD [ "npm", "start" ]