FROM node:14.16.0-slim

WORKDIR /build

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

#Ran into issues where the db would be ready after the app had started,
#so I added this github modification to make sure the db is ready prior to the app starting

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

EXPOSE 1337

CMD /wait && npm run start