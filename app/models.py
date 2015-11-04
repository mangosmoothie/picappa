import os.path
from . import db
from datetime import datetime
from enum import Enum


class MediaType(Enum):
    unknown = 000
    picture = 100
    thumbnail = 200
    video = 300


class Status(Enum):
    new = 100
    new_bulk = 150
    new_dupe = 175
    verified = 200
    trash = 300


class MediaItem(db.Model):
    __tablename__ = 'mediaitem'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    original_filename = db.Column(db.String(255), nullable=False)
    origin_date = db.Column(db.DateTime, nullable=True)
    added_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    modified_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    media_type_cd = db.Column(db.Integer, nullable=False)
    thumbnail_id = db.Column(db.Integer, db.ForeignKey('mediaitem.id'), nullable=True)
    status_cd = db.Column(db.String(10), nullable=False, default='new')

    thumbnail = db.relationship('MediaItem', cascade='all, delete-orphan')
    tags = db.relationship('MediaItemTag', cascade='all, delete-orphan', backref='mediaitem')
    mediaitem_mediastores = db.relationship('MediaItemMediaStore', cascade='all, delete-orphan')

#    media_type = MediaType(self.media_type_cd) if self.media_type_cd else None

    def __init__(self, filepath, name=None, status=Status.new, description=None, origin_date=datetime.utcnow()):
        self.name = name
        self.description = description
        self.origin_date = origin_date
        self.status_cd = status.value
        self.original_filename = os.path.basename(filepath)

        if name is None:
            self.name = os.path.basename(filepath)
        else:
            self.name = name

        if description is not None:
            self.description = description

        self.media_type_cd = get_media_type(filepath).value

    def __repr__(self):
        return 'MediaItem(%r, %r, %r)' % (self.id, self.media_type.name if self.media_type else 'Undefined', self.name)


class Tag(db.Model):
    __tablename__ = 'tag'

    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('tag.id'), nullable=True)
    name = db.Column(db.String(55), nullable=False)

    children = db.relationship('Tag', cascade='all', backref=db.backref('parent', remote_side='Tag.id'))
    media_items = db.relationship('MediaItemTag', cascade='all, delete-orphan', backref='tag')

    def __init__(self, name, parent=None):
        self.name = name
        self.parent_id = parent.id if parent else None

    def __repr__(self):
        return 'Tag(%r, %r)' % (self.id, self.name)


class MediaItemTag(db.Model):
    __tablename__ = 'mediaitem_tag'

    mediaitem_id = db.Column(db.Integer, db.ForeignKey('mediaitem.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), primary_key=True)

    def __init__(self, mediaitem, tag):
        self.mediaitem_id = mediaitem.id
        self.tag_id = tag.id


class MediaStore(db.Model):
    __tablename__ = 'mediastore'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False)
    designator = db.Column(db.String(55), nullable=False, unique=True)
    base_dir = db.Column(db.String(500), nullable=False)

    def __init__(self, name, designator):
        self.name = name
        self.designator = designator

    def __repr__(self):
        return 'MediaStore(%r)' % self.name


class MediaItemMediaStore(db.Model):
    __tablename__ = 'mediaitem_mediastore'

    mediaitem_id = db.Column(db.Integer, db.ForeignKey('mediaitem.id'), primary_key=True)
    mediastore_id = db.Column(db.Integer, db.ForeignKey('mediastore.id'), primary_key=True)
    path = db.Column(db.String(500), nullable=False)

    def __init__(self, mediaitem, mediastore, path):
        self.mediaitem_id = mediaitem.id
        self.mediastore_id = mediastore.id
        self.path = path


def get_media_type(filename):
    _, ext = os.path.splitext(filename)
    if ext in ['.img', '.jpg', '.gif', '.jpeg', '.png']:
        return MediaType.picture
    elif ext in ['.mov', '.mpg', '.mp4', '.mpeg']:
        return MediaType.video
    else:
        return MediaType.unknown