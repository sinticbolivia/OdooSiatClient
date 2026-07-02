/** @odoo-module **/
import {Component, onMounted, useState, xml} from '@odoo/owl';
import {useService} from '@web/core/utils/hooks';

class DetallePrevalorada extends Component
{
    static template = `<div class="hotel-detalle">
		<div class="row">
			<div class="col-12 col-sm-6">
				<div class="form-group mb-2">
					<label>Cantidad Facturas</label>
					<input type="number" min="1" max="100" class="form-control" required v-model="invoice.data.cantidad" />
				</div>
			</div>
		</div>
	</div>`;
	static props = {
	    invoice: {type: Object, optional: false},
	};
	setup()
	{
	    onMounted( () => {
	        this.props.invoice.data.cantidad = 1;
	    });

	}
}
class ItemPrevalorada extends Component
{
	setup()
	{
	}
};
export {DetallePrevalorada, ItemPrevalorada};