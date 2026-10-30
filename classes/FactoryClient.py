import logging
from odoo.http import request
from datetime import datetime
#from ..libs.siat_client import Config
from ..libs import siat_client as siat
from .. import constants

_logger = logging.getLogger(__name__)


class FactoryClient:
    _cfg_instances = {}

    @staticmethod
    def get_config():

        return FactoryClient.get_company_config(request.env.company.id)

    @staticmethod
    def get_db_config():
        db_config = request.env['siat_client.config'].search([
            ('company_id', '=', request.env.company.id),
            ('enabled', '=', True),
            ('is_default', '=', True)
        ], limit=1)

        return db_config

    @staticmethod
    def get_db_config_by_id(id: int, default_if_not_found=True):
        db_config = request.env['siat_client.config'].search([('id', '=', id)], limit=1)
        if len(db_config) > 0:
            return db_config

        return FactoryClient.get_db_config() if default_if_not_found else None

    @staticmethod
    def get_company_config(company_id):
        key = 'cid_{0}'.format(company_id)
        if key in FactoryClient._cfg_instances:
            return FactoryClient._cfg_instances.get(key)

        db_config = request.env['siat_client.config'].search([
            ('company_id', '=', company_id),
            ('enabled', '=', True),
            ('is_default', '=', True)
        ], limit=1)

        config = FactoryClient.db_data2config(db_config)
        FactoryClient._cfg_instances[key] = config

        return config

    @staticmethod
    def get_config_by_id(config_id:int) -> siat.Config:
        #db_config = request.env['siat_client.config'].search([('id', '=', config_id)], limit=1)
        db_config = FactoryClient.get_db_config_by_id(config_id)
        return FactoryClient.db_data2config(db_config)

    @staticmethod
    def db_data2config(db_config):
        config = siat.Config(constants.DATA_DIR)
        if len(db_config) <= 0:
            return config

        config.server = db_config.endpoint
        config.username = db_config.username
        config.password = db_config.password
        config.token = db_config.token
        _logger.info('Using SIAT Config: %s', db_config.name)
        _logger.info('DB CONFIG TOKEN: %s', db_config.token)
        if config.token:
            expiration = siat.Utils.decode_token(config.token).get('exp')
            token_expire_date = datetime.fromtimestamp(expiration)
            _logger.info('SIAT TOKEN EXPIRES AT: %d => %s', expiration, token_expire_date.strftime('%Y-%m-%d %H:%M:%S'))

        if not db_config.token or db_config.token is False or db_config.token is None or siat.Utils.token_expired(db_config.token):
            _logger.info('GETTING SIAT API TOKEN')
            service = FactoryClient.instance_sync_service(config)
            data = service.login()
            _logger.info(data)
            config.token = service.get_token()
            _logger.info('SAVING TOKEN: %s', service.get_token())
            db_config.write({'token': service.get_token()})

        return config

    @staticmethod
    def instance_type(type: str, cfg: siat.Config=None):
        config = cfg if cfg is not None else FactoryClient.get_config()
        service = None
        if type == 'facturacion':
            service = siat.ServicioFacturacion()
        elif type == 'operaciones':
            service = siat.ServicioOperaciones()
        else:
            service = siat.ServicioSincronizacion()
        config.validate()
        service.set_config(config)

        return service

    @staticmethod
    def instance_sync_service(cfg: siat.Config = None) -> siat.ServicioSincronizacion:
        service = FactoryClient.instance_type('sync', cfg)

        #if not service.get_token() or service.is_token_expired():
        #    service.login()
            #request.env['siat_client.config'].write()
            # service.get_config().save()

        return service

    @staticmethod
    def instance_service(cfg: siat.Config = None) -> siat.ServicioFacturacion:
        service = FactoryClient.instance_type('facturacion', cfg)

        return service

    @staticmethod
    def instance_ops_service(cfg: siat.Config = None) -> siat.ServicioOperaciones:
        service = FactoryClient.instance_type('operaciones', cfg)

        return service
