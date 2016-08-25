FROM ubuntu:16.10

RUN apt-get update && apt-get install -y \
        git \
        python3 \
        python3-dev \
        python3-setuptools \
        nginx \
        build-essential \
        supervisor \
        sqlite3 \
        vim \
    && rm -rf /var/lib/apt/lists/*

RUN easy_install3 pip

RUN pip3 install uwsgi

COPY requirements.txt /home/picappa/requirements.txt

RUN pip3 install -r /home/picappa/requirements.txt

COPY . /home/picappa

COPY nginx-app.conf /etc/nginx/sites-available/default

ENV FLASK_CONFIG=production

EXPOSE 80 9191 2121

WORKDIR "/home/picappa"

RUN rm data.sqlite && sqlite3 data.sqlite && python3 manage.py db upgrade

RUN sqlite3 data.sqlite < basedata.sql

CMD ["supervisord", "-n"]
