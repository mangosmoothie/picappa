from . import main
import os.path
from flask import current_app, send_file
import logging


@main.route('/mediastore/thumbs/<filename>', methods=['GET'])
def get_thumb(filename):
    logging.log(logging.INFO, 'getting thumbnail: ' + filename)
    return send_file(os.path.join(current_app.config['BASE_DIR'], 'mediastore', 'thumbs', filename))


@main.route('/mediastore/<filename>', methods=['GET'])
def get_image(filename):
    logging.log(logging.INFO, 'getting file: ' + filename)
    return send_file(os.path.join(current_app.config['BASE_DIR'], 'mediastore', filename))


@main.route('/', methods=['GET', 'POST'])
def index():
    return current_app.send_static_file('index.html')

