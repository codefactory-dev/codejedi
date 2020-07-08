# build environment
FROM node:8.7.0-alpine as build

# Create app directory and use it as the working directory
RUN mkdir -p /srv/app/admin-client
WORKDIR /srv/app/admin-client

COPY package.json /srv/app/admin-client
COPY package-lock.json /srv-app/admin-client
COPY .env /srv-app/admin-client

RUN npm install --silent
RUN npm install react-scripts@3.3.1 -g --silent

COPY . /srv/app/admin-client

CMD [ "npm", "start" ]


# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]