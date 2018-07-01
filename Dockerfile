FROM nodejs:alpine

WORKDIR /
RUN mkdir inline-backend
RUN npm install -g nodemon
ADD ./ /inline-backend
WORKDIR /inline-backend
RUN npm i

ENV PGHOST=35.197.54.173                                          
ENV PGPORT=5432                                                   
ENV PGUSER=postgres                                               
ENV PGPASSWORD=frangos123                                             
ENV PGDATABASE=postgres                                               
ENV MONGO_URL=mongodb://marcos:marcos123@35.199.174.155:27017/cool_db

CMD ["npm", "run", "dev"]
EXPOSE 3300
