import os
import logging

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard to guess string'
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    BASE_DIR = basedir
    LOGGING_LEVEL = logging.DEBUG
    LOCAL_MEDIASTORE_DESIGNATOR = 'local-primary'
    FTP_SERVER = os.path.join(basedir, 'app', 'ftp.py')
    FTP_PORT = '2121'
    FTP_LOG = os.path.join(basedir, 'logs', 'ftp.log')
    # FTP_LANDING_ZONE = os.path.abspath(os.path.join(basedir, 'landingzone/'))
    FTP_LANDING_ZONE = '/Users/nlloyd/projects/picappa/landingzone/'

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'data.sqlite')


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or 'sqlite:///' + os.path.join(basedir,
                                                                                                 'data-test.sqlite')


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'data.sqlite')


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,

    'default': DevelopmentConfig
}
