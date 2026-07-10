from odoo import models, api
from odoo.exceptions import UserError
import logging
import traceback

from ..classes.FactoryClient import FactoryClient
from ..resources.resource_customer import ResourceCustomer
from ..libs.client import Factura

_logger = logging.getLogger(__name__)


class SiatInvoices(models.Model):
    _name = 'siat_client.invoice'
    _description = 'Siat Client Invoices data model'

    @api.model
    def get_items(self, *args, **kwargs):
        try:
            pagina = int(kwargs.get('page', 1))
            service = FactoryClient.instance_service()
            res = service.get_facturas(pagina)
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
    def create_invoice(self, *args, **kwargs):
        invoiceData = kwargs.get('invoice')
        # print(invoiceData)
        factura = Factura()
        factura.bind(invoiceData, ['items'])
        _logger.info('INVOICE OBJECT DATA: %s', factura.to_json_pretty())
        try:
            siat_api = FactoryClient.instance_service()
            res = siat_api.crear_factura(factura)
            _logger.info('SIAT CLIENT INVOICE RESPONSE: %s', res)
            if res.get('status') == 'error':
                raise UserError('SIAT CLIENT ERROR: ' + res.get('error'))

            return res

        except UserError as e:
            _logger.error('SIAT CLIENT INVOICE ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise e

        except Exception as e:
            _logger.error('SIAT CLIENT INVOICE GENERAL ERROR: %s', str(e))
            _logger.error(traceback.format_exc())
            raise UserError(str(e))

    @api.model
    def search_customer(self, *args, **kwargs):
        keyword = kwargs.get('keyword', '')

        if not keyword:
            return []
            #return request.make_json_response({'status': 'ok', 'code': 200, 'data': []})

        items = self.env['res.partner'].search(
            [
                ('name', 'ilike', keyword),
                ('type', '=', 'contact')
            ],
            order='name ASC',
            limit=20
        )
        resources = []

        for item in items:
            res = ResourceCustomer(item.read()[0])
            resources.append(res.dict())

        return resources
