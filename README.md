# picappa
application for saving, sharing, searching, browsing, and tagging personal visual media

I use this app to manage all my personal media (family photos, vids, etc.) on a linux server I use primarily for storage at home.

## Picture Browser
![View Pictures](./images/picviewer.png, "View Pictures")

## Multi-Select Edit / Tagging
![Mutli Tagging](./images/tagger.png, "Tag Pictures")

## Overview

1. main application is Flask with React / Bootstrap / vanilla js frontend
    ```
    $ python manage.py runserver
    ```
1. includes standalone ftp server (ftp.py) for bulk loading of files
    ```
    $ python ftp.py -P 2121 -m /path/to/picappa/mediastore -l /path/to/ftp-logs
    ```
1. clients can use picappa\_sync.py to bulk-load to the ftp server / picappa. this script should be placed in a parent directory that includes mediafiles to sync.
    ```
    $ cd /path/to/media-to-sync
    $ python picappa_sync.py
    ```
