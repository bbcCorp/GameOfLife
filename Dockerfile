FROM bbcstar/ubuntu-python-dev
RUN apt-get update
WORKDIR /var/www
RUN git clone https://github.com/bbcCorp/GameOfLife.git
WORKDIR /var/www/GameOfLife
RUN pip install -r requirements.txt
CMD ./run.sh
EXPOSE 5000
