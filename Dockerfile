FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm -g install yarn

# Install app dependencies
COPY . /usr/src/app/
RUN yarn install

VOLUME ["/data"]

ENTRYPOINT [ "yarn", "start" ]
