#!/bin/sh

docker run -d -v /Users/nlloyd/mediastore:/home/picappa/mediastore -p 8080:80 -p 9191:9191 --name picappa picappa
