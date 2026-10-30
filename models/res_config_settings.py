# -*- coding: utf-8 -*-
from odoo import api, fields, models

import logging
import json

_logger = logging.getLogger(__name__)


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    pos_siat_config_id = fields.Many2one('siat_client.config',
        string='Siat Config',
        related='pos_config_id.siat_config_id',
        readonly=False,
    )
    pos_siat_pos_code = fields.Integer('Codigo Punto Venta',
        default=0,
        related='pos_config_id.siat_pos_code',
        readonly=False,
    )

    '''
    def get_values(self):
        res = super(ResConfigSettings, self).get_values()
        _logger.info('CONFIG VALUES: %s', res)
        res['siat_pos_code'] = 11

        return res
    '''