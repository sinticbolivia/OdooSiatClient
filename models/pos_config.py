from odoo import fields, models, api, _


class SiatPosConfig(models.Model):
    _inherit = 'pos.config'


    siat_config_id = fields.Many2one('siat_client.config', string='Siat Config')
    siat_pos_code = fields.Integer('Codigo Punto Venta', default=0)
