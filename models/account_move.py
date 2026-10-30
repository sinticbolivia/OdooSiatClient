from odoo import fields, models, api, _
from odoo.exceptions import UserError, ValidationError
from urllib.parse import urlparse, parse_qs
import logging
import traceback
import json
from ..classes.FactoryClient import FactoryClient
from ..libs import siat_client as siat

_logger = logging.getLogger(__name__)


class SiatAccountMove(models.Model):
    _inherit = 'account.move'

    invoice_siat_id = fields.Integer('SIAT ID')
    siat_url = fields.Char('SIAT URL', size=512)
    siat_print_url = fields.Char('SIAT PRINT URL', size=512)
    siat_config_id = fields.Many2one('siat_client.config', string='Siat Config')
    siat_invoice_num = fields.Char(compute='_get_siat_num', store=False)
    siat_cuf = fields.Char(compute='_get_siat_cuf', store=False)
    siat_config_id_name = fields.Char('SIAT Config', store=False, related='siat_config_id.name')

    @api.depends('siat_url')
    def _get_siat_num(self):
        parsed_url = urlparse(self.siat_url)
        args = parse_qs(parsed_url.query)
        self.siat_invoice_num = args.get('numero')[0]

    @api.depends('siat_url')
    def _get_siat_cuf(self):
        parsed_url = urlparse(self.siat_url)
        args = parse_qs(parsed_url.query)
        print(parsed_url.query, args)
        self.siat_cuf = args.get('cuf')[0]

    def _post(self, soft=True):
        to_post = super()._post(soft)

        if to_post.move_type != 'out_invoice':
            return to_post

        _logger.info('TO POST: %s', json.dumps(to_post.read(), default=str, indent=2))
        # _logger.info('POS ORDER: %s', to_post.pos_order_ids)
        # _logger.info('POS ORDER LINES: %s', json.dumps(to_post.invoice_line_ids.read(), default=str, indent=2))
        _logger.info('POS CONFIG: %s', to_post.pos_order_ids.config_id.siat_config_id.name)

        db_config = to_post.pos_order_ids.config_id.siat_config_id
        if not db_config:
            db_config = self.env['siat_client.config'].search([
                ('company_id', '=', self.env.company.id),
                ('is_default', '=', True)
            ], limit=1)
            if len(db_config) <= 0:
                raise ValidationError('El punto de venta no tiene asignada una configuracion para la facturacion')

        config = FactoryClient.db_data2config(db_config)

        try:
            config.validate()
            factura = siat.Factura()
            factura.codigo_documento_sector = 1
            factura.codigo_sucursal = 0
            factura.punto_venta = to_post.pos_order_ids.config_id.siat_pos_code
            factura.customer_id = to_post.partner_id.id
            factura.customer = to_post.partner_id.name
            factura.customer_email = to_post.partner_id.email
            factura.tipo_documento_identidad = 1
            factura.nit_ruc_nif = to_post.partner_id.vat
            factura.complemento = ''
            factura.codigo_metodo_pago = 1
            factura.numero_tarjeta = None
            # 'total': to_post.amount_total,
            factura.subtotal = 0
            factura.total = float('{0:.2f}'.format(to_post.amount_total))
            factura.codigo_moneda = 1
            factura.tipo_cambio = 1
            factura.monto_giftcard = 0
            factura.discount = 0
            # factura.data': {'excepcion': 0, 'custom_fields': {}}

            for line in to_post.invoice_line_ids:
                if line.product_id.siat_config_id.id != db_config.id:
                    raise ValidationError(
                        'El producto %s tiene la configuracion de facturacion distinta al del punto de venta'.format(
                            line.product_id.name))
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
                item.price = line.price_total # line.price_unit
                item.discount = line.discount
                item.numero_serie = ''
                item.numero_imei = ''
                factura.add_item(item)

            factura.calcular_total()

            service = FactoryClient.instance_service(config)
            res = service.crear_factura(factura)
            _logger.info('ACCOUNT MOVE INVOICE API RESPONSE: %s', res)
            if res.get('data', {}).get('error'):
                raise ValidationError(res.get('data', {}).get('error'))

            if res.get('data', {}).get('invoice_id', None) is not None:
                to_post.write({
                    'invoice_siat_id': res['data'].get('invoice_id', None),
                    'siat_url': res['data'].get('siat_url'),
                    'siat_print_url': res['data'].get('print_url'),
                    'siat_config_id': db_config.id,
                })

            return to_post

        except Exception as e:
            # raise UserError(str(e))
            _logger.error('ERROR: ' + str(e))
            _logger.error('STACK TRACE: %s', traceback.format_exc())
            raise ValidationError(str(e))

    def action_invoice_download_pdf(self, target = "download"):
        if not self.invoice_siat_id:
            return super().action_invoice_download_pdf(target)

        return {
            'type': 'ir.actions.act_url',
            'url': self.siat_print_url,
            'target': target,
        }