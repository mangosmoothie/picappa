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
    && rm -rf /var/lib/apt/lists/*

RUN easy_install3 pip

RUN pip3 install uwsgi

COPY ../requirements.txt ~/picappa/requirements.txt

RUN pip3 install -r ~/picappa/requirements.txt

EXPOSE 80

CMD ["/bin/bash"]