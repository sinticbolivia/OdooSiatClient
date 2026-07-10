# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
{
	'name': 'FacturacionSIATCliente',
	'countries': ['bo'],
	'version': '1.0.0',
	'summary': 'Facturacion SIAT API Cliente',
	'sequence': 10,
	'author': 'SinticBolivia',
	'description': """
	Cliente de Facturacion SIAT.
	El cliente realiza el consumo de la API Rest de Facturacion de Sintic Bolivia.
	""",
	'category': 'Accounting/Accounting',
	'website': 'https://sinticbolivia.net',
	# 'images': [],
	'depends': ['base', 'web', 'stock', 'stock_account', 'mail', 'point_of_sale', 'pos_sale'],
	'data': [
		'security/ir.model.access.csv',
		'views/views.xml',
		'views/actions.xml',
		'views/menu_views.xml',
		#'views/pos_config.xml',
		#'views/branch_view.xml',
		#'views/events_view.xml',
		'views/product_view.xml',
		#'views/account_move_views.xml',
	],
	'assets': {
		'web.assets_backend': [
			'/siat_client/static/src/js/components/**/*',
			'/siat_client/static/src/js/modals/**/*',
			'/siat_client/static/src/js/siat_model.js',
			'/siat_client/static/src/js/siat_model_customers.js',
			'/siat_client/static/src/js/siat_arch_parser.js',
			'/siat_client/static/src/js/siat_controller.js',
			'/siat_client/static/src/js/siat_render.js',
			'/siat_client/static/src/js/siat_view.js',
			'/siat_client/static/src/xml/**/*',
		],
	},
	'installable': True,
	'application': True,
	'auto_install': True,
	'license': 'LGPL-3',
}
