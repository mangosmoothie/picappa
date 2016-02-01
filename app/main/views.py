import os.path
import logging
from datetime import datetime

from flask import current_app, send_file, request, Response

from . import main
from ..syncservices import create_or_update
from ..models import Tag, MediaItem


@main.route('/mediastore/thumbs/<filename>', methods=['GET'])
def get_thumb(filename):
    logging.log(logging.INFO, 'getting thumbnail: ' + filename)
    return send_file(os.path.join(current_app.config['BASE_DIR'], 'mediastore', 'thumbs', filename))


@main.route('/mediastore/<filename>', methods=['GET'])
def get_image(filename):
    logging.log(logging.INFO, 'getting file: ' + filename)
    edit = request.args.get('edit')
    if edit is not None and edit == 'true':
        return current_app.send_static_file('mediaitem_edit.html')
    return send_file(os.path.join(current_app.config['BASE_DIR'], 'mediastore', filename))


@main.route('/tag/<int:tag_id>', methods=['POST'])
def update_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)

    tags = []
    for t in request.data.get('children'):
        tags.append(Tag.query.get_or_404(t.get('id')))

    tag.children = tags
    create_or_update(tag)
    return Response(status=200)


@main.route('/mediaitem/<int:mediaitem_id>', methods=['GET'])
def get_mediaitem_form(mediaitem_id):
    return current_app.send_static_file('mi_edit.html')

@main.route('/test/<path:path>', methods=['GET'])
def get_test(path):
    return current_app.send_static_file('mi_edit.html')


# @main.route('/mediaitem/<int:mediaitem_id>', methods=['POST'])
# def update_mediaitem(mediaitem_id):
#     mediaitem = MediaItem.query.get_or_404(mediaitem_id)
#     logging.log(logging.INFO, 'updating mediaitem: ' + str(mediaitem))
#     mediaitem.name = request.data.get('name')
#     mediaitem.description = request.data.get('description')
#     mediaitem.media_type_cd = request.data.get('media_type_cd')
#     mediaitem.origin_date = datetime.fromtimestamp(request.data.get('origin_date'))
#     mediaitem.modified_date = datetime.now()
#     mediaitem.status_cd = request.data.get('status_cd')
#
#     tags = []
#     for t in request.data.get('tags'):
#         tags.append(Tag.query.get_or_404(t.get('id')))
#
#     mediaitem.tags = tags
#     create_or_update(mediaitem)
#     return Response(status=200)


@main.route('/', methods=['GET', 'POST'])
def index():
    return current_app.send_static_file('index.html')

