# base image
FROM node:12.0-alpine AS BUILD_IMAGE

#set working directory
RUN mkdir /src
WORKDIR /src

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /src/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /src/package.json
RUN npm install
RUN npm install -g @angular/cli

# add app
COPY . /src

# start app
CMD ng serve --host 0.0.0.0
