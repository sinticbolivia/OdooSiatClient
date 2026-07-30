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

	# unidad_medida = fields.Integer(default='0')
	# unidad_medida_selector = fields.Selection(_get_unidades_medida, store=False, readonly=False, compute='_compute_unidad_medida_selector')
	unidad_medida = fields.Selection(selection='_get_unidades_medida', default='0')
	actividad_economica = fields.Selection(selection='_get_actividades', default='')
	# codigo_producto_sin = fields.Integer(default=0)
	codigo_producto_sin = fields.Selection(
		'_get_productos_sin',
		required=False,
	)

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
			_logger.error('ERROR _get_actividades: %s', str(e))

		return data

	def _get_unidades_medida(self):
		data = [('0', '-- unidad medida --')]

		try:
			api_sync = FactoryClient.instance_sync_service()
			res = api_sync.unidades_medida()
			if res is None:
				return data
			for actividad in res.get('data')['RespuestaListaParametricas']['listaCodigos']:
				data.append((str(actividad.get('codigoClasificador')), actividad.get('descripcion')))
		except Exception as e:
			_logger.error('ERROR _get_unidades_medida: %s', str(e))

		return data

	def _get_productos_sin(self):
		codigos_sin = [(0, '-- producto sin --')]

		try:
			api_sync = FactoryClient.instance_sync_service()
			res = api_sync.lista_productos()
			if res is None:
				return codigos_sin
			codes = []

			for item in res.get('data')['RespuestaListaProductos']['listaCodigos']:
				#_code = '{0}:{1}'.format(item.get('codigoActividad'), item.get('codigoProducto'))
				_code = int(item.get('codigoProducto', 0))
				# print(_code)
				if _code in codes:
					continue

				codes.append(_code)
				codigos_sin.append(
					(_code, '{0} | {1}'.format(item.get('descripcionProducto'), item.get('codigoActividad')))
				)
		except Exception as e:
			_logger.error('ERROR __get_productos_sin: %s', str(e))

		return codigos_sin

		
			
