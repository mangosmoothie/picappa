import os.path
from . import db
from .models import MediaItem, MediaItemMediaStore, MediaType, MediaStore


def get_mediastore(designator):
    return db.session.query(MediaStore).filter(MediaStore.designator == designator).first()


def create_mediaitem(mediaitem, mediastore):
    mi_ms = MediaItemMediaStore(mediaitem, mediastore, make_path(mediastore, mediaitem))
    mediaitem.mediaitem_mediastores.append(mi_ms)
    db.session.add(mediaitem)
    db.session.commit()


def make_path(mediastore, mediaitem):
    # TODO: make more intelligent to generate good paths
    return os.path.join(mediastore.base_dir, str(mediaitem.id) + str(os.path.splitext(mediaitem.original_filename)))
