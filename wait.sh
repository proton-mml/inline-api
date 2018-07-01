#!/usr/bin/env sh

until psql -c '\q' &> /dev/null; do
    sleep 0.5
done;

until mongo --host $MONGO_URL --eval 'quit()'; do
    sleep 0.5
done;

sleep 10

$*
