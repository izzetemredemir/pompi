FROM node:16 AS build
WORKDIR /app

COPY ./pompi.fi/package.json ./pompi.fi/package-lock.json ./
RUN npm install --legacy-peer-deps

COPY ./pompi.fi .
RUN npm run build

FROM nginx:1.19

COPY ./pompi.fi/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
