# STAGE 1
FROM node:12.16.1-alpine As builder

WORKDIR /usr/src/app
COPY package.json ./

RUN npm install
RUN npm install -g @angular/cli@9.0.4

COPY . ./
RUN ng build --prod


# STAGE 2
FROM nginx:1.15.8-alpine
COPY --from=builder /usr/src/app/dist/trianz-ui /usr/share/nginx/html
EXPOSE 4200 80
# run nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]