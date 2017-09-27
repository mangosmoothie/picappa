import os
from ftplib import FTP
import json
from socket import getfqdn
import hashlib


def update_status_file():
    data = {}
    to_transfer = []
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
            filepath = os.path.join(subdir, file)
            hashcd = hashlib.md5(open(filepath, 'rb').read()).hexdigest()
            media_deets = data['transferred_media'].get(hashcd)
            if not media_deets and not filepath.endswith('.py'):
                media_deets = {'filepath': filepath, 'filesize': os.stat(filepath).st_size, 'hash_cd': hashcd}
                data['transferred_media'][hashcd] = media_deets
                to_transfer.append(media_deets)

    ftp = FTP()
    ftp.connect(host='localhost', port=2121)
    ftp.login()
    for t in to_transfer:
        print('transferring file: ' + t['filepath'])
        f = open(t['filepath'], 'rb')
        ftp.storbinary('STOR ' + os.path.basename(t['filepath']), f)
        f.close()
    ftp.close()

    with open('.picappasync', 'w') as outfile:
        json.dump(data, outfile)


if __name__ == '__main__':
    update_status_file()
