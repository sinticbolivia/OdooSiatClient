/** @odoo-module **/
const IceTotals = {
	template: `<div class="productos-ice-totals m-0 row">
		<div class="col-12 col-sm-9 text-end"><b>Subtotal:</b></div>
		<div class="col-12 col-sm-3 text-end"><b>{{ invoice.subtotal.toFixed(2) }}</b></div>
		<div class="col-12 col-sm-9 text-end"><div style="line-height:37px;"><b>Descuento:</b></div></div>
		<div class="col-12 col-sm-3">
			<input type="text" class="form-control text-end" v-model="invoice.discount"/>
		</div>
		<div class="col-12 col-sm-9 text-end"><b>Total:</b></div>
		<div class="col-12 col-sm-3 text-end"><b>{{ invoice.total.toFixed(2) }}</b></div>
		<div class="col-12 col-sm-9 text-end"><b>Total ICE Especifico:</b></div>
		<div class="col-12 col-sm-3 text-end"><b>{{ totalIceEspecifico.toFixed(2) }}</b></div>
		<div class="col-12 col-sm-9 text-end"><b>Total ICE Porcentual:</b></div>
		<div class="col-12 col-sm-3 text-end"><b>{{ totalIcePorcentual.toFixed(2) }}</b></div>
		<div class="col-12 col-sm-9 text-end"><b>Total Base Credito Fiscal:</b></div>
		<div class="col-12 col-sm-3 text-end"><b>{{ total_base.toFixed(2) }}</b></div>
		<div class="col-12 col-sm-9 text-end"><b>Crédito fiscal:</b></div>
		<div class="col-12 col-sm-3 text-end"><b>{{ invoice.total_tax.toFixed(2) }}</b></div>
	</div>`,
	props: {invoice: {type: Object, required: true}},
	watch:
	{
		
	},
	data()
	{
		return {
			totalIceEspecifico: 0,
			totalIcePorcentual: 0,
			total_base: 0,
		};		
	},
	methods:
	{
		afterCalculateTotals()
		{
			//this.$parent.calculateTotals();
			//this.invoice.total += isNaN(parseFloat(this.monto_arrendamiento)) ? 0 : parseFloat(this.monto_arrendamiento);
			console.log('afterCalculateTotals');
			const cantidadIce = 1.98;
			this.totalIceEspecifico 	= 0;
			this.totalIcePorcentual 	= 0;
			this.invoice.subtotal		= 0;
			
			for(let item of this.invoice.items)
			{
				let alicuotaIva			= (item.quantity * item.price - item.discount) * 0.13;
				let precioNetoVentaIce	= ((item.quantity * item.price) - item.discount) - alicuotaIva;
				let montoIceEspecifico	= cantidadIce * item.alicuotaEspecifica;
				let montoIcePorcentual	= (precioNetoVentaIce * (item.alicuotaPorcentual / 100)) * 100;
				item.total				= ((item.quantity * item.price) - item.discount) 
													+ montoIcePorcentual + montoIceEspecifico;
				
				item.data.custom_fields.precioNetoVentaIce = parseFloat(precioNetoVentaIce.toFixed(5));														
				item.data.custom_fields.alicuotaIva = parseFloat(alicuotaIva.toFixed(5));														
				item.data.custom_fields.montoIceEspecifico = parseFloat(montoIceEspecifico.toFixed(5));
				item.data.custom_fields.montoIcePorcentual = parseFloat(montoIcePorcentual.toFixed(5));
				//$detalle->subTotal				= number_format($detalle->subTotal, 2);
				//TODO: Find the correct value for marceIce
				//let marcaIce				= 1; 
				this.totalIceEspecifico	+= montoIceEspecifico;
				this.totalIcePorcentual	+= montoIcePorcentual;
				this.invoice.subtotal += item.total;
			}
			this.invoice.data.custom_fields.montoIceEspecifico = parseFloat(this.totalIceEspecifico.toFixed(5));
			this.invoice.data.custom_fields.montoIcePorcentual = parseFloat(this.totalIcePorcentual.toFixed(5));
			this.invoice.total = this.invoice.subtotal - this.invoice.discount;
			this.total_base = this.invoice.total - this.totalIceEspecifico - this.totalIcePorcentual;
			this.invoice.total_tax = this.total_base * 0.13;
			
		},
		onAddItem(evt)
		{
			//console.log(evt.detail);
			evt.detail.item.alicuotaEspecifica = evt.detail.product.ice_specific;
			evt.detail.item.alicuotaPorcentual = evt.detail.product.ice_percent;
		}	
	},
	mounted()
	{
		
	},
	created()
	{
		this.invoice.monto_giftcard = 0;
		document.addEventListener('invoice_add_item', (evt) => {this.onAddItem(evt);});
	}
};

export {IceTotals};