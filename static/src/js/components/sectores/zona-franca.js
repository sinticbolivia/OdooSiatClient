/** @odoo-module **/
import { Component, onMounted, onWillStart, useState, xml } from "@odoo/owl";

class DetalleZonaFranca extends Component
{
	static template = xml`<div>
		<div class="row">
			<div class="col-12 col-sm-6">
				<div class="mb-2">
					<label>Nro. Parte Recepcion</label>
					<input type="text" class="form-control" t-model="props.invoice.data.custom_fields.numeroParteRecepcion" />
				</div>
			</div>
			<div class="col-12 col-sm-6">
				<div class="mb-2">
					
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
	        this.invoice.data.custom_fields.nitConjunto = '';
	    });

	}
};
const ItemZonaFranca = {
	
};

export {DetalleZonaFranca, ItemZonaFranca};