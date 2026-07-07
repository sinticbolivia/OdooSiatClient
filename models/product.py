# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
from odoo import api, fields, models, _
from odoo.http import request
from odoo.exceptions import UserError
from itertools import groupby
from operator import itemgetter
from datetime import date
from ..classes.FactoryClient import FactoryClient


class ProductTemplate(models.Model):
	_inherit = 'product.template'

	# unidad_medida = fields.Integer(default='0')
	# unidad_medida_selector = fields.Selection(_get_unidades_medida, store=False, readonly=False, compute='_compute_unidad_medida_selector')
	unidad_medida = fields.Selection('_get_unidades_medida', readonly=False)
	actividad_economica = fields.Selection('_get_actividades', readonly=False)
	# codigo_producto_sin = fields.Selection('_get_productos_sin', readonly=False)
	codigo_producto_sin = fields.Integer(default=0)

	#'''
	codigo_producto_sin_selector = fields.Selection(
		'_get_productos_sin',
		store=False,
		readonly=False,
		compute='_compute_codigo_producto_sin_selector'
	)
	#'''

	# siat_invoice_item_id = fields.One2many('siat.invoiceitem', 'product_id')

	def _get_actividades(self):

		data = [('', '-- actividad economica --')]
		try:
			api_sync = FactoryClient.instance_sync_service()
			res = api_sync.actividades()
			if res is None:
				return data
			for actividad in res.get('data', {})['RespuestaListaActividades']['listaActividades']:
				data.append(
					(
						actividad.get('codigoCaeb'),
						'{0} ({1})'.format(actividad.get('descripcion'), actividad.get('codigoCaeb'))
					)
				)
		except Exception as e:
			print('ERROR __get_actividades', str(e))

		return data

	def _get_unidades_medida(self):
		# print('REQUEST', type(request), hasattr(request, 'env'))
		data = [('0', '-- unidad medida --')]

		try:
			api_sync = FactoryClient.instance_sync_service()
			res = api_sync.unidades_medida()
			if res is None:
				return data
			for actividad in res.get('data')['RespuestaListaParametricas']['listaCodigos']:
				data.append((str(actividad.get('codigoClasificador')), actividad.get('descripcion')))
		except Exception as e:
			print('ERROR __get_unidades_medida', str(e))

		return data

	def _get_productos_sin(self):
		# print('ARG', arg)
		codigos_sin = [('0', '-- producto sin --')]
		try:
			api_sync = FactoryClient.instance_sync_service()
			res = api_sync.lista_productos()
			if res is None:
				return codigos_sin
			codes = []

			for item in res.get('data')['RespuestaListaProductos']['listaCodigos']:
				_code = '{0}:{1}'.format(item.get('codigoActividad'), item.get('codigoProducto'))
				print(_code)
				if _code in codes:
					continue

				codes.append(_code)
				codigos_sin.append(
					(_code, '{0} ({1})'.format(item.get('descripcionProducto'), item.get('codigoActividad')))
				)
		except Exception as e:
			print('ERROR __get_productos_sin', str(e))

		return codigos_sin

	@api.onchange('codigo_producto_sin_selector')
	def _onchange_codigo_producto_sin_selector(self):
		if self.codigo_producto_sin_selector is False:
			return
			
		_code = self.codigo_producto_sin_selector
		if ':' not in _code:
			self.codigo_producto_sin = 0
			return

		actividad, codigo = _code.split(':')
		print('CODIGO', codigo)
		self.codigo_producto_sin = int( codigo )
		
			
