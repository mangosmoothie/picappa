import os.path
import logging
from PIL import Image, ExifTags
from datetime import datetime
from flask import current_app
import hashlib
import exifread
from shutil import move
from . import db
from .models import MediaItem, MediaItemMediaStore, MediaType, MediaStore, Status, local_mediastore_designators, Tag
from sqlalchemy import desc, func, and_


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


def create_thumbnail(parent_mediaitem, parent_mediaitem_mediastore, mediastore):
    filename = str(parent_mediaitem.id)
    filepath = os.path.join(mediastore.base_dir, 'thumbs', filename + '.jpeg')

    if parent_mediaitem.media_type_cd == 100:
        img = Image.open(parent_mediaitem_mediastore.path)
        img.thumbnail((300, 300))
        try:
            for orientation in ExifTags.TAGS.keys():
                if ExifTags.TAGS[orientation] == 'Orientation':
                    break
            exif = dict(img._getexif().items())
            if exif[orientation] == 3:
                img = img.rotate(180)
            elif exif[orientation] == 6:
                img = img.rotate(270)
            elif exif[orientation] == 8:
                img = img.rotate(90)
        except:
            logging.exception('error getting image orientation')
    elif parent_mediaitem.media_type_cd == 300:
        img = Image.open('app/static/images/video.jpg')
        img.thumbnail((300, 300))
    else:
        img = Image.open('app/static/images/question-mark.jpg')
        img.thumbnail((300, 300))

    img.save(filepath, 'jpeg')
    thumb = MediaItem(filename, generate_hash_filepath(filepath))
    parent_mediaitem.thumbnail = thumb
    mi_ms = MediaItemMediaStore(thumb, mediastore, filepath)
    thumb.mediaitem_mediastores.append(mi_ms)
    db.session.add(thumb)
    db.session.commit()


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
    if mediaitem.media_type_cd == 100:
        try:
            media_file = open(filepath, 'rb')
            tags = exifread.process_file(media_file, details=False)
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
            mediaitem.origin_date = org_date
        except:
            logging.error('failed to extract metadata for: ' + str(mediaitem))
    file_size = os.stat(filepath).st_size

    mediaitem.file_size = file_size
    logging.log(logging.DEBUG, str(mediaitem) + ' - set file size = ' + str(file_size))


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


def get_pics(tag_ids=None, start_num=None, per_page=None):
    if start_num is None and per_page is None:
        return MediaItem.query.filter(MediaItem.thumbnail_id != None).order_by(desc(MediaItem.id)).all()
    else:
        if tag_ids:
            return db.session.query(MediaItem).join(MediaItem.tags) \
                .filter(and_(MediaItem.thumbnail_id != None, Tag.id.in_(tag_ids))) \
                .order_by(desc(MediaItem.id)).limit(per_page).offset(start_num).distinct().all()
        else:
            return MediaItem.query.filter(MediaItem.thumbnail_id != None).order_by(desc(MediaItem.id)) \
                .limit(per_page).offset(start_num).all()


def get_new_tag():
    return find_tag_by_name('New')


def find_tag_by_name(tag_name):
    return Tag.query.filter(Tag.name == tag_name).first()


def find_or_create_tag_by_name(tag_name):
    t = find_tag_by_name(tag_name)
    if t is None:
        t = Tag(tag_name)
        db.session.add(t)
        db.session.commit()
    return t


def create_or_update(item):
    db.session.add(item)
    db.session.commit()


def update_mediaitem(mediaitem):
    create_or_update(mediaitem)
    return mediaitem


def find_tags(tag_names):
    tags = []
    for t in tag_names:
        tag = Tag.query.filter(func.lower(Tag.name) == func.lower(t)).first()
        if tag:
            tags.append(tag)
        else:
            tags.append(Tag(t))
    return tags


def add_all_tags(pic_ids, tag_ids):
    tags = db.session.query(Tag).filter(Tag.id.in_(tag_ids)).all()
    mis = db.session.query(MediaItem).filter(MediaItem.id.in_(pic_ids)).all()
    for mi in mis:
        for tag in tags:
            mi.add_tag(tag)
        db.session.add(mi)
    db.session.commit()
