FROM node:alpine

WORKDIR /

RUN apk update
RUN apk add postgresql-client mongodb
RUN npm install -g nodemon

RUN mkdir inline-backend
ADD ./ /inline-backend
WORKDIR /inline-backend
RUN npm install

ENV PGHOST='postgres_db'
ENV PGPORT='5432'
ENV PGUSER='postgres'
ENV PGPASSWORD='pass'
ENV PGDATABASE='postgres'
ENV MONGO_URL='mongodb://mongo:mongomongo@mongo_db:27017'

CMD ["sh", "wait.sh", "npm", "run", "dev"]
EXPOSE 3300
