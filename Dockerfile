FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y python-pip && apt-get install -y git
RUN pip install --upgrade pip
WORKDIR /var/www
RUN git clone https://github.com/bbcCorp/GameOfLife.git
WORKDIR /var/www/GameOfLife
RUN pip install -r requirements.txt
CMD ./run.sh
EXPOSE 1337
