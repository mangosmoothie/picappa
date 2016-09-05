FROM ubuntu:16.04

RUN apt-get update && apt-get install -y \
        git \
        python3 \
        python3-dev \
        python3-setuptools \
        nginx \
        build-essential \
        supervisor \
        sqlite3 \
        npm \
    && rm -rf /var/lib/apt/lists/*

RUN easy_install3 pip

RUN pip3 install uwsgi

COPY requirements.txt /home/picappa/requirements.txt

RUN pip3 install -r /home/picappa/requirements.txt

RUN npm install -g bower

COPY bower.json /home/picappa/bower.json

RUN ln -s /usr/bin/nodejs /usr/bin/node && bower install /home/picappa/bower.json

COPY . /home/picappa

COPY nginx-app.conf /etc/nginx/sites-available/default

ENV FLASK_CONFIG=production

EXPOSE 80 9191 2121

WORKDIR "/home/picappa"

RUN rm data.sqlite; mkdir logs; exit 0 

RUN sqlite3 data.sqlite && python3 manage.py db upgrade

RUN sqlite3 data.sqlite < basedata.sql

CMD ["supervisord", "-n"]
