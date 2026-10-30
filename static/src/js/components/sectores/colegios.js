/** @odoo-module **/
import { Component, onMounted, onWillStart, useState, xml } from "@odoo/owl";

class DetalleColegio extends Component
{
	static template = xml`<div class="hotel-detalle">
		<div class="row">
			<div class="col-12 col-sm-6">
				<div class="mb-2">
					<label>Nombre Estudiante</label>
					<input type="text" class="form-control" required="" t-model="props.invoice.data.custom_fields.nombreEstudiante" />
				</div>
			</div>
			<div class="col-13 col-sm-6">
				<div class="mb-2">
					<label>Periodo Facturado</label>
					<input type="text" class="form-control" required="" t-model="props.invoice.data.custom_fields.periodoFacturado" />
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
	        this.props.invoice.data.custom_fields.nombreEstudiante = '';
	        this.props.invoice.data.custom_fields.periodoFacturado = '';//sb_formatdate(new Date(), 'Y-m-d');
	    });
	}
};
class ItemColegio extends Component
{
    setup()
    {
    }
};
export {DetalleColegio, ItemColegio};