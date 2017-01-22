# Conway's game of Life

This is a simple demonstation of Conway's Game of Life. 
This application is built using Python-Bottle backend and a simple Javascript based frontend. 

## How to run the application server
There is a standalone python bottle server that is listening to port 1337

Execute ./run.sh

Point your browser to localhost:1337

--------------------------------------------------------------
## How to Unit Test this application

Start the Jasmine server on port 1338:

$ jasmine -p 1338

Point your browser to localhost:1338 

----------------------------------------------------------------

## Docker Image

I have put out a docker image of this application, based on latest ubuntu image with apache and python. 
The image is available as "bbcstar/game-of-life-wfe"

If you have docker installed, you can run a container using this image using the following command

$ docker run -d --name game-of-life-wfe1 -p 1337:80 bbcstar/game-of-life-wfe /usr/sbin/apache2ctl -D FOREGROUND

The container listens to port 1337. You can test the setup 
$ curl localhost:1337/test

If you get a response 'Alive', you can point your browser to localhost:1337 and try out the application.

----------------------------------------------------------------