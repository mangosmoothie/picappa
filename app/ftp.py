import sys
import os
import logging
import requests
from getopt import getopt, GetoptError
from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer


def main():
    pass


def print_usage():
    print('usage: ftp.py [-P port] [-m mediastore] [-l logfile] [-D]')
    print('    -m --mediastore: directory containing the local media')
    print('    -P --port: port number for the ftp server - default = 21')
    print('    -l --logfile: external logfile location - default logging is stdout')
    print('    -D --debugoff: turnoff debug mode - debug logging level')
    print('')
    print('starts an ftp server to use for upload/download of application media')


class PicappaFTPHandler(FTPHandler):
    def on_file_received(self, file):
        file_metadata = {'filename': file, 'mediastore_designator': 'ftp-bulk', 'process-duplicates': 'false'}
        resp = requests.post('http://localhost:5000/api/process-transferred-media', json=file_metadata)
        if resp.status_code > 299:
            logging.log(logging.ERROR,
                        'ERROR WHILE TRANSFERRING FILE: ' + file + ' RECEIVED RESPONSE FROM PICAPPA: ' + str(resp))

    def on_incomplete_file_received(self, file):
        os.remove(file)


if __name__ == '__main__':
    args = sys.argv[1:]
    port, mediastore_dir, logfile_dir, logging_level = '', '', '', logging.DEBUG
    try:
        opts, args = getopt(args, 'hP:m:l:', ['port=', 'mediastore=', 'logfile='])
    except GetoptError:
        print_usage()
        sys.exit(2)
    if len(opts) == 0:
        print_usage()
        sys.exit()
    for opt, arg in opts:
        if opt in ('-h', '--help'):
            print_usage()
            sys.exit()
        if opt in ('-P', '--port'):
            port = arg
        if opt in ('-m', '--mediastore'):
            mediastore_dir = arg
        if opt in ('-l', '--logfile'):
            logfile_dir = arg
        if opt in ('-D', '--debugoff'):
            logging_level = logging.INFO

    authorizer = DummyAuthorizer()

    authorizer.add_user('anonymous', '', mediastore_dir, perm='elradfmwM')

    handler = PicappaFTPHandler
    handler.authorizer = authorizer

    handler.banner = 'picappa ftp is ready'

    if logfile_dir != '':
        logging.basicConfig(filename=logfile_dir, level=logging_level)
    else:
        logging.basicConfig(level=logging_level)

    address = ('', port)
    server = FTPServer(address, handler)

    server.max_cons = 256
    server.max_cons_per_ip = 256

    server.serve_forever()
