# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
from odoo import api, fields, models, _
from odoo.http import request
from odoo.exceptions import UserError
from itertools import groupby
from operator import itemgetter
from datetime import date
import logging
from ..classes.FactoryClient import FactoryClient

_logger = logging.getLogger(__name__)


class ProductTemplate(models.Model):
	_inherit = 'product.template'

	unidad_medida = fields.Integer(
		'Unidad de Medida SIN',
		required=False,
		default='0'
	)
	actividad_economica = fields.Char(
		'Actividad Economica SIN',
		required=False,
		size=16,
		default=''
	)
	codigo_producto_sin = fields.Integer('Codigo Producto SIN', required=False, default=0)
	siat_config_id = fields.Many2one('siat_client.config', string='Siat Config')

	@api.onchange('siat_config_id')
	def update_fields(self):
		_logger.info('SIAT_CONFIG_ID CHANGED: %d', self.siat_config_id)
		config = FactoryClient.get_config_by_id(self.siat_config_id)
		_logger.info(config.__dict__)


		
			
