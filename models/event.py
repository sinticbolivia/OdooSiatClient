from odoo import models, api
from odoo.exceptions import UserError
import logging
import traceback

from ..classes.FactoryClient import FactoryClient

_logger = logging.getLogger(__name__)


class SiatEvents(models.Model):
    _name = 'siat_client.event'
    _description = ''

    @api.model
    def create(self, *args, **kwargs):
        pass

    @api.model
    def close(self, *args, **kwargs):
        pass

    @api.model
    def read_all(self, *args, **kwargs):
        sucursal = kwargs.get('sucursal', 0)
        puntoventa = kwargs.get('puntoventa', 0)
        page = int(kwargs.get('page', 1))
        limit = int(kwargs.get('limit', 25))
        config_id = int(kwargs.get('config_id', 0))
        try:
            config = FactoryClient.get_config_by_id(config_id) if config_id > 0 else None
            service = FactoryClient.instance_ops_service(config)
            res = service.lista_eventos(page, limit)
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT CUIS ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT CUIS GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def read(self, *args, **kwargs):
        pass