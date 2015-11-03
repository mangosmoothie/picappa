from . import main
from flask import request, Response
from ..models import MediaItem, Status
from ..syncservices import get_mediastore, create_mediaitem

@main.route('/api/process-transferred-media', methods=['POST'])
def process_transferred_media():
    content = request.get_json()
    print('GOT THE CONTENT!!! -> ' + str(content))
    ms = get_mediastore(content['mediastore_designator'])
    mi = MediaItem(content['filepath'], status=Status.new_bulk)
    create_mediaitem(mi, ms)
    return Response(status=200)
