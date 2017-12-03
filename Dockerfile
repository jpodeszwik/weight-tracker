FROM node:7

RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install
RUN cd front && npm run build && mv dist ../static

CMD ["/usr/local/bin/npm", "run", "start"]
