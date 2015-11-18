#!/usr/bin/env python
import os
import logging
from app import create_app, db
from app.models import MediaItem, Tag, MediaStore, MediaItemMediaStore, MediaType, Status
from flask.ext.script import Manager, Shell, Server
from flask.ext.migrate import Migrate, MigrateCommand

app = create_app(os.getenv('FLASK_CONFIG') or 'default', False)
manager = Manager(app)
migrate = Migrate(app, db)

logging.basicConfig(filename='logs/app.log', level=app.config['LOGGING_LEVEL'])


def make_shell_context():
    return dict(app=app, db=db, MediaItem=MediaItem, Tag=Tag, MediaStore=MediaStore, MediaItemMediaStore=MediaItemMediaStore, MediaType=MediaType, Status=Status)


manager.add_command("shell", Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)
manager.add_command('runserver', Server())


@manager.command
def test():
    """Run the unit tests."""
    import unittest
    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(tests)


@manager.command
def resetdata():
    """Resets the database with base data"""
    import inspect
    import app.models
    from flask import current_app
    for _, c in inspect.getmembers(app.models, lambda x: inspect.isclass(x)):
        if c.__dict__.get('__table__') is not None:
            c.query.delete()
    db.session.commit()
    db.engine.execute('DELETE FROM mediaitem_tag')
    local_mediastore = MediaStore('local-primary', 'local-primary', 'mediastore/')
    ftp_landingzone = MediaStore('ftp-bulk', 'ftp-bulk', current_app.config['FTP_LANDING_ZONE'])
    new_tag = Tag('New')
    db.session.add(local_mediastore)
    db.session.add(ftp_landingzone)
    db.session.add(new_tag)
    db.session.commit()
    remove_all_in_dir('mediastore/')
    remove_all_in_dir(current_app.config['FTP_LANDING_ZONE'])
    os.mkdir('mediastore/thumbs')


def remove_all_in_dir(directory):
    from shutil import rmtree
    for root, dirs, files in os.walk(directory):
        for f in files:
            os.unlink(os.path.join(root, f))
        for d in dirs:
            rmtree(os.path.join(root, d))


if __name__ == '__main__':
    manager.run()
