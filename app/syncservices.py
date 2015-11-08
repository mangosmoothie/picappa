import os.path
import logging
from datetime import datetime
from flask import current_app
import hashlib
import exifread
from shutil import move
from . import db
from .models import MediaItem, MediaItemMediaStore, MediaType, MediaStore, Status, local_mediastore_designators
from sqlalchemy import desc


def get_mediastore(designator):
    return db.session.query(MediaStore).filter(MediaStore.designator == designator).first()


def create_mediaitem(mediaitem, mediastore):
    db.session.add(mediaitem)
    db.session.flush()
    mi_ms = MediaItemMediaStore(mediaitem, mediastore)
    mediaitem.mediaitem_mediastores.append(mi_ms)
    db.session.add(mi_ms)
    db.session.commit()
    return mediaitem, mediastore, mi_ms


def search_for_and_mark_duplicate_mediaitem(mediaitem):
    if mediaitem_hash_exists(mediaitem.hash_cd):
        logging.log(logging.INFO, 'duplicate detected: ' + str(mediaitem))
        mediaitem.status_cd = Status.new_dupe.value


def transfer_file(src_mediastore, src_filename, dest_mediaitem_mediastore):
    if src_mediastore.designator in local_mediastore_designators() and \
                dest_mediaitem_mediastore.mediastore.designator in local_mediastore_designators():
        move(os.path.join(src_mediastore.base_dir, src_filename), dest_mediaitem_mediastore.path)
        logging.log(logging.INFO,
                    'file: ' + os.path.join(src_mediastore.base_dir,
                                            src_filename) + ' transferred to ' + dest_mediaitem_mediastore.path)
        return dest_mediaitem_mediastore.path
    raise NotImplementedError(
        'unable to transfer between these mediastores: src={0} dest={1}'.format(str(src_mediastore),
                                                                                str(dest_mediaitem_mediastore)))


def extract_and_attach_metadata(mediaitem, filepath):
    media_file = open(filepath, 'rb')
    tags = exifread.process_file(media_file, details=False)
    file_hash = generate_hash_file(media_file)
    org_date_tag = tags.get('EXIF DateTimeOriginal')
    org_date = datetime.now()
    if org_date_tag:
        org_date = datetime.strptime(str(org_date_tag), '%Y:%m:%d %H:%M:%S')
    else:
        org_date_tag = tags.get('EXIF DateTimeDigitized')
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
    mediaitem.hash_cd = file_hash
    logging.log(logging.DEBUG, str(mediaitem) + ' - set file size = ' + str(file_size) + ' set origin date = ' + str(
        org_date) + ' set hash cd = ' + file_hash)


def remove_file(mediastore, filename):
    if mediastore.designator in local_mediastore_designators():
        os.remove(os.path.join(mediastore.base_dir, filename))
        logging.log(logging.INFO, 'removing file: ' + filename + ' from: ' + str(mediastore))
        return True
    raise NotImplementedError('cannot handle remove for ' + str(mediastore))


def mediaitem_hash_exists(input_hash):
    mi = MediaItem.query.filter_by(hash_cd=input_hash).first()
    if mi:
        logging.log(logging.INFO, str(mi))
        return True
    else:
        return False


def remove_duplicate_mediaitem_hashes(hashes):
    unique_hashes = []
    for h in hashes:
        if not mediaitem_hash_exists(h):
            unique_hashes.append(h)
    return unique_hashes


def generate_hash_filepath(filepath):
    return generate_hash_file(open(filepath, 'rb'))


def generate_hash_file(file):
    return hashlib.md5(file.read()).hexdigest()


def get_pics(start_num=None, end_num=None):
    if start_num is None and end_num is None:
        return MediaItem.query.order_by(desc(MediaItem.modified_date)).all()
    else:
        raise NotImplementedError('paging has not been implemented yet')
