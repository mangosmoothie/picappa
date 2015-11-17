from . import main
import os.path
import logging
from flask import request, Response, current_app, jsonify
from ..models import MediaItem, Status
from ..syncservices import get_mediastore, create_mediaitem, transfer_file, extract_and_attach_metadata, \
    search_for_and_mark_duplicate_mediaitem, remove_file, remove_duplicate_mediaitem_hashes, generate_hash_filepath, \
    get_pics, create_thumbnail, get_new_tag, update_mediaitem


@main.route('/api/process-transferred-media', methods=['POST'])
def process_transferred_media():
    content = request.get_json()
    curr_ms = get_mediastore(content['mediastore_designator'])
    curr_filename = content['filename']
    curr_hash_cd = generate_hash_filepath(os.path.join(curr_ms.base_dir, curr_filename))
    mi = MediaItem(curr_filename, curr_hash_cd, status=Status.new_bulk)
    ms = get_mediastore(current_app.config['LOCAL_MEDIASTORE_DESIGNATOR'])
    process_dupes = True if content.get('process_duplicates') == 'true' else False
    logging.log(logging.INFO, 'creating content for transferred file: ' + curr_filename)
    search_for_and_mark_duplicate_mediaitem(mi)
    if process_dupes or not mi.status_cd == Status.new_dupe.value:
        extract_and_attach_metadata(mi, os.path.join(curr_ms.base_dir, curr_filename))
        mi.tags.append(get_new_tag())
        mi, ms, mi_ms = create_mediaitem(mi, ms)
        new_filepath = transfer_file(curr_ms, curr_filename, mi_ms)
        create_thumbnail(mi, mi_ms, ms)
        logging.log(logging.INFO, 'successfully transferred file to: ' + new_filepath)
    else:
        remove_file(curr_ms, curr_filename)
        logging.log(logging.INFO, 'duplicate file detected - file will not be processed: ' + curr_filename)
    return Response(status=200)


@main.route('/api/mediaitem/<int:mediaitem_id>', methods=['GET', 'POST'])
def handle_mediaitem(mediaitem_id):
    if request.method == 'GET':
        mi = MediaItem.query.get_or_404(mediaitem_id)
        return jsonify(mi.to_json())

    if request.method == 'POST':
        if int(request.form['id']) != mediaitem_id:
            return Response(status=500)
        mi = MediaItem.query.get_or_404(mediaitem_id)
        mi.name = request.form['name']
        mi.description = request.form['description']
        mi.media_type_cd = int(request.form['media_type_cd'])
        mi.status_cd = int(request.form['status_cd'])
        mi = update_mediaitem(mi)
        return jsonify(mi.to_json())


@main.route('/api/pictures', methods=['GET'])
def get_pictures():
    pics = get_pics()
    logging.log(logging.INFO, 'got pics: ' + str(pics))
    return jsonify({'pictures': [pic.to_json() for pic in pics]})


@main.route('/api/filter-existing-hashes', methods=['POST'])
def filter_existing_hashes():
    content = request.get_json()
    hashes = remove_duplicate_mediaitem_hashes(content['hash_codes'])
    return jsonify(hashes)

