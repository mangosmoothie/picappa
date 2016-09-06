import os
import json
import hashlib
from socket import getfqdn
from requests import post
from datetime import datetime


def send_files(media_deets, files):
    files['deets'] = ('deets', json.dumps(media_deets), 'application/json')
    post('http://localhost:5000/api/upload-files', files=files)
    print('successfully uploaded ' + str(len(media_deets)) + ' files')


def sync_files():
    data = {}
    deets = {}
    to_upload = {}
    if os.path.exists('.picappasync'):
        with open('.picappasync') as in_file:
            data = json.load(in_file)
    else:
        data['mediastore_designator'] = os.getcwd() + "@" + getfqdn()
        data['transferred_media'] = {}
    for subdir, dir, files in os.walk(os.getcwd()):
        for file in files:
            if file[0] in ['.', '~']:
                continue
            if file.endswith('.py'):
                continue
            filepath = os.path.join(subdir, file)
            hashcd = hashlib.md5(open(filepath, 'rb').read()).hexdigest()
            media_deets = data['transferred_media'].get(hashcd)
            if not media_deets:
                deets[file] = {'filesize': os.stat(filepath).st_size, 'hash_cd': hashcd, 'folder': os.path.basename(subdir)}
                to_upload[file] = (file, open(filepath, 'rb'), 'application/octet-stream')
                data['transferred_media'][hashcd] = str(datetime.now())
                if len(deets) > 4:
                    send_files(deets, to_upload)
                    deets, to_upload = {}, {}

    if len(deets) > 0:
        send_files(deets, to_upload)

    with open('.picappasync', 'w') as outfile:
        json.dump(data, outfile)


if __name__ == '__main__':
    sync_files()
