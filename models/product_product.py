from odoo import api, fields, models, _
from odoo.http import request
from odoo.exceptions import UserError
from itertools import groupby
from operator import itemgetter
from datetime import date
import logging
from ..classes.FactoryClient import FactoryClient

_logger = logging.getLogger(__name__)

class ProductProduct(models.Model):
    _inherit = 'product.product'

    @api.model
    # def get_taxed_price(self, price, taxes, fiscal_position, **kwargs):
    def get_taxed_price(self, product_id, **kwargs):
        product = self.browse(product_id)
        price = product.lst_price  # or get from pricelist if needed
        taxes = product.taxes_id.compute_all(
            price,
            currency=product.currency_id,
            quantity=1,
            product=product,
            partner=False
        )
        return {
            'price_untaxed': taxes['total_excluded'],
            'price_included': taxes['total_included'],
            'tax_amount': taxes['total_included'] - taxes['total_excluded']
        }
        '''
        print('PRICE', price, 'TAX', taxes)
        product_taxes = self.env['account.tax'].browse(taxes)
        print(product_taxes)
        taxed_price = self._get_tax_included_unit_price_from_price(
                price,
                product_taxes,
                fiscal_position=fiscal_position,
                product_taxes_after_fp=None,
        )
        return taxed_price
        '''