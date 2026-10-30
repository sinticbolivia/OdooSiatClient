from odoo import models, api
from odoo.exceptions import UserError
import logging
import traceback

from ..classes.FactoryClient import FactoryClient
from ..classes.SiatCache import SiatCache

_logger = logging.getLogger(__name__)


class SiatSync(models.Model):
    _name = 'siat_client.sync'
    _description = 'Siat Client Sync data model'


    @api.model
    def get_cuis(self, *args, **kwargs):
        sucursal = int(kwargs.get('sucursal', 0))
        puntoventa = int(kwargs.get('puntoventa', 0))
        config_id = int(kwargs.get('config_id', 0))
        try:
            #config = FactoryClient.get_config_by_id(config_id) if config_id > 0 else None
            db_config = FactoryClient.get_db_config_by_id(config_id)
            cache_file = 'c{0}-cfg{1}-cuis'.format(db_config.company_id.id, db_config.id)
            if SiatCache.file_needs_refresh(cache_file):
                service = FactoryClient.instance_sync_service(FactoryClient.db_data2config(db_config))
                res = service.cuis(sucursal, puntoventa)
                SiatCache.write_cache_json(cache_file, res)
            else:
                res = SiatCache.read_cache_json(cache_file)

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
        sucursal = int(kwargs.get('sucursal', 0))
        puntoventa = int(kwargs.get('puntoventa', 0))
        config_id = int(kwargs.get('config_id', 0))
        renew = int(kwargs.get('renew', 0))
        try:
            db_config = FactoryClient.get_db_config_by_id(config_id)
            cache_file = 'c{0}-cfg{1}-cufd'.format(db_config.company_id.id, db_config.id)
            if SiatCache.file_needs_refresh(cache_file):
                service = FactoryClient.instance_sync_service(FactoryClient.db_data2config(db_config))
                res = service.cufd(sucursal, puntoventa)
                SiatCache.write_cache_json(cache_file, res)
            else:
                res = SiatCache.read_cache_json(cache_file)

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
        config_id = int(kwargs.get('config_id', 0))
        try:
            db_config = FactoryClient.get_db_config_by_id(config_id)
            cache_file = 'c{0}-cfg{1}-actividades'.format(db_config.company_id.id, db_config.id)
            if SiatCache.file_needs_refresh(cache_file):
                service = FactoryClient.instance_sync_service(FactoryClient.db_data2config(db_config))
                res = service.actividades(sucursal, puntoventa)
                SiatCache.write_cache_json(cache_file, res)
            else:
                res = SiatCache.read_cache_json(cache_file)

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
        config_id = int(kwargs.get('config_id', 0))
        try:
            db_config = FactoryClient.get_db_config_by_id(config_id)
            cache_file = 'c{0}-cfg{1}-leyendas'.format(db_config.company_id.id, db_config.id)
            if SiatCache.file_needs_refresh(cache_file):
                service = FactoryClient.instance_sync_service(FactoryClient.db_data2config(db_config))
                res = service.leyendas(sucursal, puntoventa)
                SiatCache.write_cache_json(cache_file, res)
            else:
                res = SiatCache.read_cache_json(cache_file)

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
        config_id = int(kwargs.get('config_id', 0))
        try:
            db_config = FactoryClient.get_db_config_by_id(config_id)
            cache_file = 'c{0}-cfg{1}-motivos_anulacion'.format(db_config.company_id.id, db_config.id)
            if SiatCache.file_needs_refresh(cache_file):
                service = FactoryClient.instance_sync_service(FactoryClient.db_data2config(db_config))
                res = service.motivos_anulacion(sucursal, puntoventa)
                SiatCache.write_cache_json(cache_file, res)
            else:
                res = SiatCache.read_cache_json(cache_file)

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
        config_id = int(kwargs.get('config_id', 0))
        try:
            db_config = FactoryClient.get_db_config_by_id(config_id)
            cache_file = 'c{0}-cfg{1}-lista_productos'.format(db_config.company_id.id, db_config.id)
            if SiatCache.file_needs_refresh(cache_file):
                service = FactoryClient.instance_sync_service(FactoryClient.db_data2config(db_config))
                res = service.lista_productos(sucursal, puntoventa)
                SiatCache.write_cache_json(cache_file, res)
            else:
                res = SiatCache.read_cache_json(cache_file)

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
        config_id = int(kwargs.get('config_id', 0))
        try:
            db_config = FactoryClient.get_db_config_by_id(config_id)
            cache_file = 'c{0}-cfg{1}-unidades_medida'.format(db_config.company_id.id, db_config.id)
            if SiatCache.file_needs_refresh(cache_file):
                service = FactoryClient.instance_sync_service(FactoryClient.db_data2config(db_config))
                res = service.unidades_medida(sucursal, puntoventa)
                SiatCache.write_cache_json(cache_file, res)
            else:
                res = SiatCache.read_cache_json(cache_file)

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
        config_id = int(kwargs.get('config_id', 0))
        try:
            db_config = FactoryClient.get_db_config_by_id(config_id)
            cache_file = 'c{0}-cfg{1}-tipos_documentos_identidad'.format(db_config.company_id.id, db_config.id)
            if SiatCache.file_needs_refresh(cache_file):
                service = FactoryClient.instance_sync_service(FactoryClient.db_data2config(db_config))
                res = service.tipos_documentos_identidad(sucursal, puntoventa)
                SiatCache.write_cache_json(cache_file, res)
            else:
                res = SiatCache.read_cache_json(cache_file)

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
        config_id = int(kwargs.get('config_id', 0))
        try:
            db_config = FactoryClient.get_db_config_by_id(config_id)
            cache_file = 'c{0}-cfg{1}-monedas'.format(db_config.company_id.id, db_config.id)
            if SiatCache.file_needs_refresh(cache_file):
                service = FactoryClient.instance_sync_service(FactoryClient.db_data2config(db_config))
                res = service.monedas(sucursal, puntoventa)
                SiatCache.write_cache_json(cache_file, res)
            else:
                res = SiatCache.read_cache_json(cache_file)

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
        config_id = int(kwargs.get('config_id', 0))
        try:
            db_config = FactoryClient.get_db_config_by_id(config_id)
            cache_file = 'c{0}-cfg{1}-metodos_pago'.format(db_config.company_id.id, db_config.id)
            if SiatCache.file_needs_refresh(cache_file):
                service = FactoryClient.instance_sync_service(FactoryClient.db_data2config(db_config))
                res = service.metodos_pago(sucursal, puntoventa)
                SiatCache.write_cache_json(cache_file, res)
            else:
                res = SiatCache.read_cache_json(cache_file)

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
        config_id = int(kwargs.get('config_id', 0))
        try:
            db_config = FactoryClient.get_db_config_by_id(config_id)
            cache_file = 'c{0}-cfg{1}-tipos_documentos_sector'.format(db_config.company_id.id, db_config.id)
            if SiatCache.file_needs_refresh(cache_file):
                service = FactoryClient.instance_sync_service(FactoryClient.db_data2config(db_config))
                res = service.tipos_documentos_sector(sucursal, puntoventa)
                SiatCache.write_cache_json(cache_file, res)
            else:
                res = SiatCache.read_cache_json(cache_file)

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
        config_id = int(kwargs.get('config_id', 0))
        try:
            db_config = FactoryClient.get_db_config_by_id(config_id)
            cache_file = 'c{0}-cfg{1}-actividades_document_sector'.format(db_config.company_id.id, db_config.id)
            if SiatCache.file_needs_refresh(cache_file):
                service = FactoryClient.instance_sync_service(FactoryClient.db_data2config(db_config))
                res = service.actividades_document_sector(sucursal, puntoventa)
                SiatCache.write_cache_json(cache_file, res)
            else:
                res = SiatCache.read_cache_json(cache_file)

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
        config_id = int(kwargs.get('config_id', 0))
        try:
            db_config = FactoryClient.get_db_config_by_id(config_id)
            cache_file = 'c{0}-cfg{1}-tipos_habitacion'.format(db_config.company_id.id, db_config.id)
            if SiatCache.file_needs_refresh(cache_file):
                service = FactoryClient.instance_sync_service(FactoryClient.db_data2config(db_config))
                res = service.tipos_habitacion(sucursal, puntoventa)
                SiatCache.write_cache_json(cache_file, res)
            else:
                res = SiatCache.read_cache_json(cache_file)

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
        config_id = int(kwargs.get('config_id', 0))
        try:
            db_config = FactoryClient.get_db_config_by_id(config_id)
            cache_file = 'c{0}-cfg{1}-tipos_eventos'.format(db_config.company_id.id, db_config.id)
            if SiatCache.file_needs_refresh(cache_file):
                service = FactoryClient.instance_sync_service(FactoryClient.db_data2config(db_config))
                res = service.tipos_eventos(sucursal, puntoventa)
                SiatCache.write_cache_json(cache_file, res)
            else:
                res = SiatCache.read_cache_json(cache_file)

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
        config_id = int(kwargs.get('config_id', 0))
        try:
            db_config = FactoryClient.get_db_config_by_id(config_id)
            cache_file = 'c{0}-cfg{1}-tipos_emision'.format(db_config.company_id.id, db_config.id)
            if SiatCache.file_needs_refresh(cache_file):
                service = FactoryClient.instance_sync_service(FactoryClient.db_data2config(db_config))
                res = service.tipos_emision(sucursal, puntoventa)
                SiatCache.write_cache_json(cache_file, res)
            else:
                res = SiatCache.read_cache_json(cache_file)

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
        config_id = int(kwargs.get('config_id', 0))
        try:
            db_config = FactoryClient.get_db_config_by_id(config_id)
            cache_file = 'c{0}-cfg{1}-tipos_facturas'.format(db_config.company_id.id, db_config.id)
            if SiatCache.file_needs_refresh(cache_file):
                service = FactoryClient.instance_sync_service(FactoryClient.db_data2config(db_config))
                res = service.tipos_facturas(sucursal, puntoventa)
                SiatCache.write_cache_json(cache_file, res)
            else:
                res = SiatCache.read_cache_json(cache_file)

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
        config_id = int(kwargs.get('config_id', 0))
        try:
            db_config = FactoryClient.get_db_config_by_id(config_id)
            cache_file = 'c{0}-cfg{1}-tipos_punto_venta'.format(db_config.company_id.id, db_config.id)
            if SiatCache.file_needs_refresh(cache_file):
                service = FactoryClient.instance_sync_service(FactoryClient.db_data2config(db_config))
                res = service.tipos_punto_venta(sucursal, puntoventa)
                SiatCache.write_cache_json(cache_file, res)
            else:
                res = SiatCache.read_cache_json(cache_file)

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
    def get_sucursales(self, *args, **kwargs):
        config_id = int(kwargs.get('config_id', 0))
        try:
            config = FactoryClient.get_config_by_id(config_id) if config_id > 0 else None
            service = FactoryClient.instance_sync_service(config)
            res = service.sucursales()
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
        config_id = int(kwargs.get('config_id', 0))

        try:
            config = FactoryClient.get_config_by_id(config_id) if config_id > 0 else None
            service = FactoryClient.instance_sync_service(config)
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
        config_id = int(kwargs.get('config_id', 0))
        try:
            config = FactoryClient.get_config_by_id(config_id) if config_id > 0 else None
            service = FactoryClient.instance_sync_service(config)
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

    @api.model
    def read_all_cufds(self, *args, **kwargs):
        sucursal = kwargs.get('sucursal', 0)
        puntoventa = kwargs.get('puntoventa', 0)
        config_id = int(kwargs.get('config_id', 0))
        try:
            config = FactoryClient.get_config_by_id(config_id) if config_id > 0 else None
            service = FactoryClient.instance_sync_service(config)
            res = service.cufds(sucursal, puntoventa)

            return res

        except UserError as e:
            _logger.error('SIAT CLIENT CUIS ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT CUIS GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))
