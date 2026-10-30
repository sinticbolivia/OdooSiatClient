from odoo import fields, models, api, _
from odoo.exceptions import UserError, ValidationError
import logging
import traceback
_logger = logging.getLogger(__name__)


class SiatConfig(models.Model):
    _table = 'siatclient_config'
    _name = 'siat_client.config'
    _description = ''

    name = fields.Char(string='Nombre', size=128)
    endpoint = fields.Char(string='Endpoint del Servidor', size=256)
    username = fields.Char(string='Usuario', size=64)
    password = fields.Char(string='Contrasena', size=64)
    token = fields.Char(size=512)
    company_id = fields.Many2one(
        comodel_name='res.company',
        string='Company',
        store=True,
        index=True,
    )
    enabled = fields.Boolean('Habilitado')
    is_default = fields.Boolean('Por defecto', default=False)

    '''
    @api.constrains
    def _check_unique_default_per_company(self, record):
        for _record in record:
            if _record.is_default:
                domain = [
                    ('company_id', '=', record.company.id),
                    ('is_default', '=', True),
                    ('id', '!=', record.id)
                ]
                if record.search_count(domain) > 0:
                    raise ValidationError(_('Ya existe un registro marcado como predeterminado para esta compañía.'))
    '''

    @api.model
    def read_all(self, *args, **kwargs):
        items = self.env['siat_client.config'].search([
            ('company_id', '=', self.env.company.id),
            ('enabled', '=', True),
        ])
        for item in items:
            print(item, item.name)
        return items.read()

    @api.model_create_multi
    def create(self, vals_list):
        records = super().create(vals_list)
        for record in records:
            if record.is_default:
                others = self.search([
                    ('company_id', '=', record.company_id.id),
                    ('is_default', '=', True),
                    ('id', '!=', record.id)
                ])
                others.write({'is_default': False})
        return records

    def write(self, vals):
        res = super().write(vals)
        if vals.get('is_default'):
            for record in self:
                others = self.search([
                    ('company_id', '=', record.company_id.id),
                    ('is_default', '=', True),
                    ('id', '!=', record.id)
                ])
                others.write({'is_default': False})
        return res