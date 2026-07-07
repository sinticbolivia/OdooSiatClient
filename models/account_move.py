from odoo import fields, models, api, _
from odoo.exceptions import UserError, ValidationError
import logging
import traceback
from ..classes.FactoryClient import FactoryClient
from ..libs import client as siat

_logger = logging.getLogger(__name__)


class SiatAccountMove(models.Model):
    _inherit = 'account.move'

    siat_invoice_id = fields.Many2one('siat.invoice')

    invoice_cuf = fields.Char('CUF', related="siat_invoice_id.cuf", store=False)
    invoice_cufd = fields.Char('CUFD', related="siat_invoice_id.cufd", store=False)
    invoice_siat_id = fields.Char('SIAT ID', related="siat_invoice_id.siat_id", store=False)
    invoice_datetime = fields.Datetime('Fecha', related="siat_invoice_id.invoice_datetime", store=False)
    invoice_number = fields.Integer(related='siat_invoice_id.invoice_number', store=False)
    invoice_siat_url = fields.Char(compute='_siat_invoice_url', store=False)

    @api.depends('siat_invoice_id')
    def _siat_invoice_url(self):
        # print('invoice id', self.siat_invoice_id.id)
        # _invoice = self.env['siat.invoice'].search([('id', '=', self.siat_invoice_id.id)])
        self.invoice_siat_url = self.siat_invoice_id.get_siat_url()

    def _post(self, soft=True):
        to_post = super()._post(soft)

        if to_post.move_type != 'out_invoice':
            return to_post

        _logger.info('TO POST: %s', to_post.read())
        factura = siat.Factura()
        factura.codigo_documento_sector = 1
        factura.codigo_sucursal = 0
        factura.punto_venta = 0
        factura.customer_id = to_post.partner_id.id
        factura.customer = to_post.partner_id.name
        factura.customer_email = ''
        factura.tipo_documento_identidad = 1
        factura.nit_ruc_nif = to_post.partner_id.vat
        factura.complemento = ''
        factura.codigo_metodo_pago = 1
        factura.numero_tarjeta = None
        #'total': to_post.amount_total,
        factura.subtotal = 0
        factura.total = float('{0:.2f}'.format(to_post.amount_total))
        factura.codigo_moneda = 1
        factura.tipo_cambio = 1
        factura.monto_giftcard = 0
        factura.discount = 0
        # factura.data': {'excepcion': 0, 'custom_fields': {}}

        for line in to_post.invoice_line_ids:
            product_code = line.product_id.default_code
            if not product_code:
                line.product_id.code

            item = siat.FacturaItem()
            item.product_id = line.product_id.id
            item.product_code = product_code
            item.product_name = line.product_id.name  # line.product_id.display_name,
            item.quantity = line.quantity
            item.unidad_medida = line.product_id.unidad_medida
            item.codigo_actividad = line.product_id.actividad_economica
            item.codigo_producto_sin = line.product_id.codigo_producto_sin
            item.price = line.price_unit
            item.discount = line.discount
            item.numero_serie = ''
            item.numero_imei = ''
            factura.add_item(item)

        factura.calcular_total()

        try:
            service = FactoryClient.instance_service()
            res = service.crear_factura(factura)
            _logger.info('ACCOUNT MOVE INVOICE API RESPONSE: %s', res)
            if res.data.get('invoice_id', None) is not None:
                to_post.write({
                    'siat_invoice_id': res.data.get('invoice_id', None)
                })

            return to_post
        except Exception as e:
            # raise UserError(str(e))
            _logger.info('ERROR: ' + str(e))
            _logger.error('STACK TRACE', traceback.format_exc())
            raise ValidationError(str(e))

