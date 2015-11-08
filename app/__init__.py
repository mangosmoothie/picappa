from flask import Flask, render_template
from flask.ext.sqlalchemy import SQLAlchemy
from config import config
from subprocess import Popen

db = SQLAlchemy()


def create_app(config_name, run_ftp_server=False):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    db.init_app(app)

    if run_ftp_server:
        Popen(['python', app.config['FTP_SERVER'], '-P', app.config['FTP_PORT'], '-m', app.config['FTP_LANDING_ZONE'],
               '-l', app.config['FTP_LOG']])

    from .main import main as main_blueprint

    app.register_blueprint(main_blueprint)

    return app
