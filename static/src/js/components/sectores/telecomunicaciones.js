/** @odoo-module **/
const DetalleTelecomunicaciones = {
	removeFields: ['numero_serie', 'imei'],
	template: `<div>
		<div class="row">
			<div class="col-12 col-sm-6">
				<div class="mb-2">
					<label>NIT Conjunto</label>
					<input type="text" class="form-control" v-model="invoice.data.custom_fields.nitConjunto" />
				</div>
			</div>
			<div class="col-12 col-sm-6">
				<div class="mb-2">
					
				</div>
			</div>
		</div>
		
	</div>`,
	props: {
		invoice: {type: Object, required: true},
	},
	data()
	{
		return {
		};
	},
	mounted()
	{
		
	},
	created()
	{
		this.invoice.data.custom_fields.nitConjunto = '';
	}
};
const ItemTelecomunicaciones = {
	
};
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