import os
import logging
from . import models
from . import constants

_logger = logging.getLogger(__name__)

if not os.path.isdir(constants.DATA_DIR):
    _logger.info('CREATING ODOO SIAT DATA DIR')
    os.mkdir( constants.DATA_DIR )

_logger.info('ODOO SIAT DATA DIR: %s', constants.DATA_DIR)

