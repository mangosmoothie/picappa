from . import main
import os.path
import logging
from flask import request, Response, current_app, jsonify
from ..models import MediaItem, Status
from ..syncservices import get_mediastore, create_mediaitem, transfer_file, extract_and_attach_metadata, \
    search_for_and_mark_duplicate_mediaitem, remove_file, remove_duplicate_mediaitem_hashes


@main.route('/api/process-transferred-media', methods=['POST'])
def process_transferred_media():
    content = request.get_json()
    curr_ms = get_mediastore(content['mediastore_designator'])
    curr_filename = content['filename']
    mi = MediaItem(curr_filename, status=Status.new_bulk)
    ms = get_mediastore(current_app.config['LOCAL_MEDIASTORE_DESIGNATOR'])
    process_dupes = True if content.get('process_duplicates') == 'true' else False
    logging.log(logging.INFO, 'creating content for transferred file: ' + curr_filename)
    mi, ms = create_mediaitem(mi, ms)
    search_for_and_mark_duplicate_mediaitem(mi)
    if process_dupes or not mi.status_cd == Status.new_dupe.value:
        extract_and_attach_metadata(mi, os.path.join(curr_ms.base_dir, curr_filename))
        new_filename = str(mi.id) + str(os.path.splitext(mi.original_filename)[1])
        new_filepath = transfer_file(curr_ms, curr_filename, ms, new_filename)
        logging.log(logging.INFO, 'successfully transferred file to: ' + new_filepath)
    else:
        remove_file(curr_ms, curr_filename)
        logging.log(logging.INFO, 'duplicate file detected - file will not be processed: ' + curr_filename)
    return Response(status=200)


@main.route('/api/filter-existing-hashes', methods=['POST'])
def filter_existing_hashes():
    content = request.get_json()
    hashes = remove_duplicate_mediaitem_hashes(content['hash_codes'])
    return jsonify(hashes)
