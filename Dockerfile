FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app/
RUN yarn install

VOLUME ["/data"]

ENTRYPOINT [ "yarn", "start" ]
