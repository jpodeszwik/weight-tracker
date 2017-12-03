FROM node:9

RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install
RUN cd front && npm install && npm run build && mv dist ../static

CMD ["/usr/local/bin/npm", "run", "start"]
