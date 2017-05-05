FROM node:7

RUN npm install -g bower

RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install
RUN cd static && bower install --allow-root

CMD ["/usr/local/bin/npm", "run", "start"]
