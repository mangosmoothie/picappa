from . import main
import os.path
import logging
from flask import request, Response, current_app
from ..models import MediaItem, Status
from ..syncservices import get_mediastore, create_mediaitem, transfer_file, extract_and_attach_metadata, \
    search_for_and_mark_duplicate_mediaitem


@main.route('/api/process-transferred-media', methods=['POST'])
def process_transferred_media():
    content = request.get_json()
    curr_ms = get_mediastore(content['mediastore_designator'])
    curr_filename = content['filename']
    mi = MediaItem(curr_filename, status=Status.new_bulk)
    ms = get_mediastore(current_app.config['LOCAL_MEDIASTORE_DESIGNATOR'])

    logging.log(logging.INFO, 'creating content for transferred file: ' + curr_filename)
    mi, ms = create_mediaitem(mi, ms)
    search_for_and_mark_duplicate_mediaitem(mi)
    extract_and_attach_metadata(mi, os.path.join(curr_ms.base_dir, curr_filename))
    new_filename = str(mi.id) + str(os.path.splitext(mi.original_filename)[1])
    new_filepath = transfer_file(curr_ms, curr_filename, ms, new_filename)
    logging.log(logging.INFO, 'successfully transferred file to: ' + new_filepath)
    return Response(status=200)
