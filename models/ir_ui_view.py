# -*- coding: utf-8 -*-
from odoo import fields, models


class View(models.Model):
	_inherit = 'ir.ui.view'

	type = fields.Selection(
		selection_add=[('siatClient', 'Siat View')],
		ondelete={'siatClient': 'set default'},
		default='siatClient'
	)

	def _get_view_info(self):
		return {'siatClient': {'icon': 'fa fa-th'}} | super()._get_view_info()
