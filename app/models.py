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


class MediaItemMediaStoreDesig(Enum):
    general = 000
    source = 100
    primary = 200
    backup = 300


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
    file_size = db.Column(db.BigInteger, nullable=True)
    hash_cd = db.Column(db.String(32), nullable=False)

    thumbnail = db.relationship('MediaItem', remote_side=[id])
    tags = db.relationship('MediaItemTag', cascade='all, delete-orphan', backref='mediaitem')
    mediaitem_mediastores = db.relationship('MediaItemMediaStore', cascade='all, delete-orphan', backref='mediaitem')

    #    media_type = MediaType(self.media_type_cd) if self.media_type_cd else None

    def __init__(self, filepath, hash_cd, name=None, status=Status.new, description=None,
                 origin_date=datetime.utcnow(), parent_mediaitem=None):

        if parent_mediaitem is not None:
            self.name = 'thumb_' + str(parent_mediaitem.id)
            self.original_filename = parent_mediaitem.original_filename
        elif filepath is not None and hash_cd is not None:
            self.description = description
            self.origin_date = origin_date
            self.original_filename = os.path.basename(filepath)
            self.hash_cd = hash_cd
        else:
            raise NotImplementedError('unable to create mediaitem with given params')

        self.name = os.path.basename(filepath) if name is None else name
        self.description = description
        self.media_type_cd = get_media_type(filepath).value
        self.status_cd = status.value

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'origin_date': self.origin_date,
            'status_cd': self.status_cd,
            'original_filename': self.original_filename,
            'url': [x.path for x in self.mediaitem_mediastores if x.designation_cd == 000][0],
            'thumb_url': [x.path for x in self.thumbnail.mediaitem_mediastores if x.designation_cd == 000][0]
        }

    def __repr__(self):
        return 'MediaItem(%r, %r, %r)' % (self.id, str(self.media_type_cd), self.name)


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

    def __init__(self, name, designator, base_dir):
        self.name = name
        self.designator = designator
        self.base_dir = base_dir

    def __repr__(self):
        return 'MediaStore(%r)' % self.name


class MediaItemMediaStore(db.Model):
    __tablename__ = 'mediaitem_mediastore'

    mediaitem_id = db.Column(db.Integer, db.ForeignKey('mediaitem.id'), primary_key=True)
    mediastore_id = db.Column(db.Integer, db.ForeignKey('mediastore.id'), primary_key=True)
    path = db.Column(db.String(500), nullable=False)
    designation_cd = db.Column(db.Integer, nullable=False, default=000)

    mediastore = db.relationship('MediaStore')

    def __init__(self, mediaitem, mediastore, path=None):
        self.mediaitem_id = mediaitem.id
        self.mediastore_id = mediastore.id
        self.path = self.make_path(mediastore, mediaitem) if path is None else path

    @staticmethod
    def make_path(mediastore, mediaitem):
        if mediastore.designator in local_mediastore_designators():
            return os.path.join(mediastore.base_dir,
                                str(mediaitem.id) + str(os.path.splitext(mediaitem.original_filename)[1]))
        raise NotImplementedError('not setup to make path for ' + str(mediastore))


def get_media_type(filename):
    _, ext = os.path.splitext(filename)
    if ext in ['.img', '.jpg', '.gif', '.jpeg', '.png']:
        return MediaType.picture
    elif ext in ['.mov', '.mpg', '.mp4', '.mpeg']:
        return MediaType.video
    else:
        return MediaType.unknown


def local_mediastore_designators():
    return ['local-primary', 'ftp-bulk']
