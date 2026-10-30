import os
from odoo.tools import config

#DATA_DIR = os.path.dirname(__file__) + '/siat_data'
DATA_DIR = config['data_dir'] + '/siat_data'
CACHE_DIR = config['data_dir'] + '/siat_data/cache'
CACHE_TIME = 12 * 3600 #12 hours
