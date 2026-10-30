from operator import attrgetter
from odoo import fields


class SelectionData(fields.Selection):
    # Initialize your custom attribute
    data_attr = None

    # Odoo looks for _description_ + your attribute name to expose it to the view
    _description_data_attr = property(attrgetter('data_attr'))

fields.SelectionData = SelectionData