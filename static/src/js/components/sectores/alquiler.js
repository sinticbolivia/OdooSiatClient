/** @odoo-module **/
import {Component, onMounted, useState, xml} from '@odoo/owl';
import {useService} from '@web/core/utils/hooks';

class DetalleAlquiler extends Component
{
	static template = xml`<div class="hotel-detalle">
		<div class="row">
			<div class="col-12 col-sm-3">
				<div class="mb-2">
					<label>Periodo Facturado</label>
					<input type="text" class="form-control" required v-model="invoice.data.custom_fields.periodoFacturado" />
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
	        this.invoice.data.custom_fields.periodoFacturado = ''; //new Date(); //, 'Y-m-d';
	    });

	}
};
class ItemAlquiler extends Component {
	static template = ``;
	setup()
	{
		
	}
};
export {DetalleAlquiler, ItemAlquiler};