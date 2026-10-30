/** @odoo-module **/
import { Component, onMounted, onWillStart, useState, xml } from "@odoo/owl";

class DetalleTelecomunicaciones extends Component
{
	static template = xml`<div>
		<div class="row">
			<div class="col-12 col-sm-6">
				<div class="mb-2">
					<label>NIT Conjunto</label>
					<input type="text" class="form-control" t-model="props.invoice.data.custom_fields.nitConjunto" />
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
		this.props.invoice.data.custom_fields.nitConjunto = '';
	}
}
class ItemTelecomunicaciones extends Component {
	
}
/*
const TelecomunicacionesTotals = {
	template: ``,
	props: {invoice: {type: Object, required: true}},
	data()
	{
		return {
		};		
	},
	methods:
	{
		
	},
	mounted()
	{
		
	},
	created()
	{
	}
};
*/
export {DetalleTelecomunicaciones, ItemTelecomunicaciones};