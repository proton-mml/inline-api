#!/bin/bash

npm install

# INFO SENSÍVEL VAMO TIRAR FORA ISSO!!!!!!
export PGHOST=35.197.54.173                                          
export PGPORT=5432                                                   
export PGUSER=postgres                                               
export PGPASSWORD=frangos123                                             
export PGDATABASE=postgres                                               
export MONGO_URL=mongodb://marcos:marcos123@35.199.174.155:27017/cool_db

# export PGHOST=$1
# export PGPORT=$2
# export PGUSER=$3
# export PGPASSWORD=$4
# export PGDATABASE=$5
# export MONGO_URL=$6
npm start index.js
