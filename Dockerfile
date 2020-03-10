FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/app/dist/trianz_ui /usr/share/nginx/html

# base image
# FROM node:12.0-alpine AS BUILD_IMAGE

# set working directory
# RUN mkdir /src
# WORKDIR /src

# # add `/usr/src/app/node_modules/.bin` to $PATH
# ENV PATH /src/node_modules/.bin:$PATH

# # install and cache app dependencies
# COPY package.json /src/package.json
# RUN npm install
# RUN npm install -g @angular/cli

# # add app
# COPY . /src

# # start app
# CMD ng serve --host 0.0.0.0
