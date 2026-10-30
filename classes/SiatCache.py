import os
import json
import time
from .. import constants

class SiatCache:

    @staticmethod
    def file_needs_refresh(filename: str):
        cache_file = '{0}/{1}.cache'.format(constants.CACHE_DIR, filename)
        if os.path.exists(cache_file) is False:
            return True

        mtime = os.path.getmtime(cache_file)
        ctime = int(time.time())
        if ctime > (mtime + constants.CACHE_TIME):
            return True

        return False

    @staticmethod
    def write_cache(filename: str, data: str):
        cache_file = '{0}/{1}.cache'.format(constants.CACHE_DIR, filename)
        with open(cache_file, 'w') as file:
            file.write(data)
        print('CACHE FILE: WRITTEN: ', cache_file)
        return True

    @staticmethod
    def read_cache(filename: str):
        # if os.path.exists(cache_file) is False:
        #    return None
        cache_file = '{0}/{1}.cache'.format(constants.CACHE_DIR, filename)
        if os.path.isfile(cache_file) is False:
            return None

        data = None
        try:
            with open(cache_file, 'r') as file:
                data = file.read()
        except Exception as e:
            print('LOADING CACHE FILE ERROR: ', str(e))

        return data

    @staticmethod
    def read_cache_json(filename: str):
        data = SiatCache.read_cache(filename)
        if data is None:
            return data

        json_data = None
        try:
            json_data = json.loads(data)
        except Exception as e:
            print('LOADING CACHE FILE AS JSON ERROR: ', str(e))

        return json_data

    @staticmethod
    def write_cache_json(filename: str, data: dict):
        json_data = json.dumps(data, default=str)
        SiatCache.write_cache(filename, json_data)
