#!/bin/sh

echo "Kill all process who listen to port 3306"
sudo kill -9 $(lsof -t -i:3306)

echo "Waiting for MySql to start..."
./wait-for db:3306 

echo "Starting the server..."
npm start 