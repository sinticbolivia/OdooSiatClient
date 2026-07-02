/** @odoo-module **/
const DetalleFinanciera = {
	removeFields: ['numero_serie', 'imei'],
	template: ``,
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
		this.invoice.data.custom_fields.periodoFacturado = sb_formatdate(new Date(), 'Y-m-d');
	}
};
const ItemFinanciera = {
	
};
const FinancieraTotals = {
	template: `<div class="financiera-totals m-0 row">
		<div class="col-12 col-sm-9 text-end"><b>Subtotal:</b></div>
		<div class="col-12 col-sm-3 text-end"><b>{{ invoice.subtotal.toFixed(2) }}</b></div>
		<div class="col-12 col-sm-9 text-end"><b>Monto Arrendamiento:</b></div>
		<div class="col-12 col-sm-3 text-end">
			<input type="text" class="form-control text-right text-end" required v-model="monto_arrendamiento" />
		</div>
		
			<div class="col-12 col-sm-9 text-end"><div style="line-height:37px;"><b>Monto Gift Card:</b></div></div>
			<div class="col-12 col-sm-3">
				<input type="text" class="form-control text-end" v-model="invoice.monto_giftcard" required />
			</div>
		
		<div class="col-12 col-sm-9 text-end"><div style="line-height:37px;"><b>Descuento:</b></div></div>
		<div class="col-12 col-sm-3">
			<input type="text" class="form-control text-end" v-model="invoice.discount"/>
		</div>
			
		<div class="col-12 col-sm-9 text-end"><b>Total Base Credito Fiscal:</b></div>
		<div class="col-12 col-sm-3 text-end"><b>{{ invoice.total.toFixed(2) }}</b></div>
		
		<div class="col-12 col-sm-9 text-end"><b>Crédito fiscal:</b></div>
		<div class="col-12 col-sm-3 text-end"><b>{{ invoice.total_tax.toFixed(2) }}</b></div>
	</div>`,
	props: {invoice: {type: Object, required: true}},
	watch:
	{
		monto_arrendamiento()
		{
			this.invoice.data.custom_fields.montoTotalArrendamientoFinanciero = isNaN(parseFloat(this.monto_arrendamiento)) ? 0 : parseFloat(this.monto_arrendamiento);
			this.calculateTotals();
		},
		'invoice.subtotal'()
		{
			//this.calculateTotals();
		}
	},
	data()
	{
		return {
			monto_arrendamiento: 0,
		};		
	},
	methods:
	{
		calculateTotals()
		{
			console.log(this.invoice);
			this.$parent.calculateTotals();
			this.invoice.total += isNaN(parseFloat(this.monto_arrendamiento)) ? 0 : parseFloat(this.monto_arrendamiento);
		}	
	},
	mounted()
	{
		
	},
	created()
	{
		this.monto_arrendamiento = 0;
	}
};
export {DetalleFinanciera, ItemFinanciera, FinancieraTotals};