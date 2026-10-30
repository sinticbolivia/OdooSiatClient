# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
{
	'name': 'Cliente Facturacion SIAT',
	'countries': ['bo'],
	'version': '1.0.2',
	'summary': 'Cliente Facturacion SIAT',
	'sequence': 10,
	'author': 'SinticBolivia',
	'description': """
	""",
	'category': 'Accounting/Accounting',
	'website': 'https://sinticbolivia.net',
	# 'images': [],
	'depends': ['base', 'web', 'stock', 'stock_account', 'mail', 'point_of_sale', 'pos_sale'],
	'data': [
		'security/ir.model.access.csv',
		'views/views.xml',
		'views/actions.xml',
		'views/pos_config.xml',
		'views/pos_config_view.xml',
		'views/account_move_views.xml',
		'views/menu_views.xml',
		'views/product_view.xml'
	],
	'assets': {
		'web.assets_backend': [
			'/sb_siat_client/static/src/xml/templates.xml',
			'/sb_siat_client/static/src/js/fields/**/*',
			'/sb_siat_client/static/src/js/widgets/**/*',
			'/sb_siat_client/static/src/js/components/**/*',
			'/sb_siat_client/static/src/js/modals/**/*',
			#'/sb_siat_client/static/src/js/point_of_sale/**/*',
			'/sb_siat_client/static/src/js/siat_model.js',
			'/sb_siat_client/static/src/js/siat_model_customers.js',
			'/sb_siat_client/static/src/js/siat_render.js',
			'/sb_siat_client/static/src/js/siat_arch_parser.js',
			'/sb_siat_client/static/src/js/siat_render.js',
			'/sb_siat_client/static/src/js/siat_controller.js',
			'/sb_siat_client/static/src/js/siat_view.js',
		],
		'siat.bundle': [

		]
	},
	'installable': True,
	'application': True,
	'auto_install': False,
	'license': 'LGPL-3',
}
