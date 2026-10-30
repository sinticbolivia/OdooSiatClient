# -*- coding: utf-8 -*-
from odoo import fields, models


class ActWindowView(models.Model):
	_inherit = 'ir.actions.act_window.view'

	view_mode = fields.Selection(
		selection_add=[('siatClient', "Siat Action")],
		ondelete={'siatClient': 'set default'},
		default='siatClient'
	)
