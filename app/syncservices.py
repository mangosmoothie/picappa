import os.path
import logging
from datetime import datetime
import exifread
from shutil import move
from . import db
from .models import MediaItem, MediaItemMediaStore, MediaType, MediaStore, Status


def get_mediastore(designator):
    return db.session.query(MediaStore).filter(MediaStore.designator == designator).first()


def create_mediaitem(mediaitem, mediastore):
    mi_ms = MediaItemMediaStore(mediaitem, mediastore, make_path(mediastore, mediaitem))
    mediaitem.mediaitem_mediastores.append(mi_ms)
    db.session.add(mediaitem)
    db.session.commit()
    return mediaitem, mediastore


def search_for_and_mark_duplicate_mediaitem(mediaitem):
    if MediaItem.query.filter_by(original_filename=mediaitem.original_filename).filter_by(
            file_size=mediaitem.file_size).first():
        logging.log(logging.INFO, 'duplicate detected: ' + str(mediaitem))
        mediaitem.status_cd = Status.new_dupe.value


def make_path(mediastore, mediaitem):
    # TODO: make more intelligent to generate good paths
    return os.path.join(mediastore.base_dir, str(mediaitem.id) + str(os.path.splitext(mediaitem.original_filename)[1]))


def transfer_file(src_mediastore, src_filename, dest_mediastore, dest_filename):
    dest_filepath = os.path.join(dest_mediastore.base_dir, dest_filename)
    move(os.path.join(src_mediastore.base_dir, src_filename), dest_filepath)
    return dest_filepath


def extract_and_attach_metadata(mediaitem, filepath):
    media_file = open(filepath, 'rb')
    tags = exifread.process_file(media_file, details=False)
    org_date_tag = tags['EXIF DateTimeOriginal']
    org_date = datetime.now()
    if org_date_tag:
        org_date = datetime.strptime(str(org_date_tag), '%Y:%m:%d %H:%M:%S')
    else:
        org_date_tag = tags['EXIF DateTimeDigitized']
        if org_date_tag:
            org_date = datetime.strptime(str(org_date_tag), '%Y:%m:%d %H:%M:%S')
        else:
            org_date_tag = os.stat(filepath).st_birthtime
            if org_date_tag:
                org_date = datetime.fromtimestamp(org_date_tag)
            else:
                org_date_tag = os.stat(filepath).st_ctime
                if org_date_tag:
                    org_date = datetime.fromtimestamp(org_date_tag)

    file_size = os.stat(filepath).st_size

    mediaitem.origin_date = org_date
    mediaitem.file_size = file_size
