from odoo import models, fields, api
from odoo.exceptions import ValidationError, UserError
import json
import logging
import traceback

from ..classes.Config import Config
from ..libs import client as siat
from ..classes.FactoryClient import FactoryClient

_logger = logging.getLogger(__name__)


class SiatSync(models.Model):
    _name = 'siat_client.sync'
    _description = 'Siat Client Sync data model'

    @api.model
    def get_cuis(self, *args, **kwargs):
        try:
            service = FactoryClient.instance_sync_service()
            res = service.cuis()
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
    def get_cufd(self, *args, **kwargs):
        # note = kwargs.get('note')
        try:
            service = FactoryClient.instance_sync_service()
            res = service.cufd()
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT CUFD ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT CUFD GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def get_actividades(self, *args, **kwargs):
        sucursal = int(kwargs.get('sucursal', 0))
        puntoventa = int(kwargs.get('puntoventa', 0))
        try:
            service = FactoryClient.instance_sync_service()
            res = service.actividades(sucursal, puntoventa)
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT SYNC ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT SYNC GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def get_leyendas(self, *args, **kwargs):
        sucursal = int(kwargs.get('sucursal', 0))
        puntoventa = int(kwargs.get('puntoventa', 0))
        try:
            service = FactoryClient.instance_sync_service()
            res = service.leyendas(sucursal, puntoventa)
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT SYNC ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT SYNC GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def get_motivos_anulacion(self, *args, **kwargs):
        sucursal = int(kwargs.get('sucursal', 0))
        puntoventa = int(kwargs.get('puntoventa', 0))
        try:
            service = FactoryClient.instance_sync_service()
            res = service.motivos_anulacion(sucursal, puntoventa)
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT SYNC ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT SYNC GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def get_productos_servicios(self, *args, **kwargs):
        sucursal = int(kwargs.get('sucursal', 0))
        puntoventa = int(kwargs.get('puntoventa', 0))
        try:
            service = FactoryClient.instance_sync_service()
            res = service.lista_productos(sucursal, puntoventa)
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT SYNC ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT SYNC GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def get_unidades_medida(self, *args, **kwargs):
        sucursal = int(kwargs.get('sucursal', 0))
        puntoventa = int(kwargs.get('puntoventa', 0))
        try:
            service = FactoryClient.instance_sync_service()
            res = service.unidades_medida(sucursal, puntoventa)
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT SYNC ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT SYNC GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def get_documentos_identidad(self, *args, **kwargs):
        sucursal = int(kwargs.get('sucursal', 0))
        puntoventa = int(kwargs.get('puntoventa', 0))
        try:
            service = FactoryClient.instance_sync_service()
            res = service.tipos_documentos_identidad(sucursal, puntoventa)
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT SYNC ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT SYNC GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def get_monedas(self, *args, **kwargs):
        sucursal = int(kwargs.get('sucursal', 0))
        puntoventa = int(kwargs.get('puntoventa', 0))
        try:
            service = FactoryClient.instance_sync_service()
            res = service.monedas(sucursal, puntoventa)
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT SYNC ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT SYNC GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def get_metodos_pago(self, *args, **kwargs):
        sucursal = int(kwargs.get('sucursal', 0))
        puntoventa = int(kwargs.get('puntoventa', 0))
        try:
            service = FactoryClient.instance_sync_service()
            res = service.metodos_pago(sucursal, puntoventa)
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT SYNC ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT SYNC GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def get_tipos_documento_sector(self, *args, **kwargs):
        sucursal = int(kwargs.get('sucursal', 0))
        puntoventa = int(kwargs.get('puntoventa', 0))
        try:
            service = FactoryClient.instance_sync_service()
            res = service.tipos_documentos_sector(sucursal, puntoventa)
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT SYNC ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT SYNC GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def get_actividades_documento_sector(self, *args, **kwargs):
        sucursal = int(kwargs.get('sucursal', 0))
        puntoventa = int(kwargs.get('puntoventa', 0))
        try:
            service = FactoryClient.instance_sync_service()
            res = service.actividades_document_sector(sucursal, puntoventa)
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT SYNC ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT SYNC GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def get_tipos_habitacion(self, *args, **kwargs):
        sucursal = int(kwargs.get('sucursal', 0))
        puntoventa = int(kwargs.get('puntoventa', 0))
        try:
            service = FactoryClient.instance_sync_service()
            res = service.tipos_habitacion(sucursal, puntoventa)
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT SYNC ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT SYNC GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def get_tipos_eventos(self, *args, **kwargs):
        sucursal = int(kwargs.get('sucursal', 0))
        puntoventa = int(kwargs.get('puntoventa', 0))
        try:
            service = FactoryClient.instance_sync_service()
            res = service.tipos_eventos(sucursal, puntoventa)
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT SYNC ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT SYNC GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def get_tipos_emision(self, *args, **kwargs):
        sucursal = int(kwargs.get('sucursal', 0))
        puntoventa = int(kwargs.get('puntoventa', 0))
        try:
            service = FactoryClient.instance_sync_service()
            res = service.tipos_emision(sucursal, puntoventa)
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT SYNC ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT SYNC GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def get_tipos_facturas(self, *args, **kwargs):
        sucursal = int(kwargs.get('sucursal', 0))
        puntoventa = int(kwargs.get('puntoventa', 0))
        try:
            service = FactoryClient.instance_sync_service()
            res = service.tipos_facturas(sucursal, puntoventa)
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT SYNC ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT SYNC GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def get_tipos_puntoventa(self, *args, **kwargs):
        sucursal = int(kwargs.get('sucursal', 0))
        puntoventa = int(kwargs.get('puntoventa', 0))
        try:
            service = FactoryClient.instance_sync_service()
            res = service.tipos_punto_venta(sucursal, puntoventa)
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT SYNC ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT SYNC GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def get_puntosventa(self, *args, **kwargs):
        sucursal = int(kwargs.get('sucursal', 0))
        try:
            service = FactoryClient.instance_sync_service()
            res = service.puntosventa(sucursal)
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT SYNC ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT SYNC GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def get_user_documentos_sector(self, *args, **kwargs):
        try:
            service = FactoryClient.instance_sync_service()
            res = service.user_documentos_sector()
            return res

        except UserError as e:
            _logger.error('SIAT CLIENT SYNC ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT SYNC GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))
