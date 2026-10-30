/** @odoo-module **/
import { Component, onMounted, onWillStart, useState, xml } from "@odoo/owl";

class DetalleFinanciera extends Component
{
	static template = ``;
	static props = {
		invoice: {type: Object, required: true},
	};
	setup()
	{
	    onMounted( () => {
	        //this.invoice.data.custom_fields.periodoFacturado = '';//sb_formatdate(new Date(), 'Y-m-d');
	    });

	}
};
const ItemFinanciera = {
	
};
class FinancieraTotals extends Component
{
	static template = xml`<div class="financiera-totals m-0 row">
		<div class="col-12 col-sm-9 text-end"><b>Subtotal:</b></div>
		<div class="col-12 col-sm-3 text-end"><b><t t-esc="props.invoice.subtotal.toFixed(2)" /></b></div>
		<div class="col-12 col-sm-9 text-end"><b>Monto Arrendamiento:</b></div>
		<div class="col-12 col-sm-3 text-end">
			<input type="text" class="form-control text-right text-end" required="" t-model="monto_arrendamiento" />
		</div>
		
			<div class="col-12 col-sm-9 text-end"><div style="line-height:37px;"><b>Monto Gift Card:</b></div></div>
			<div class="col-12 col-sm-3">
				<input type="text" class="form-control text-end" t-model="props.invoice.monto_giftcard" required="" />
			</div>
		
		<div class="col-12 col-sm-9 text-end"><div style="line-height:37px;"><b>Descuento:</b></div></div>
		<div class="col-12 col-sm-3">
			<input type="text" class="form-control text-end" t-model="props.invoice.discount" />
		</div>
			
		<div class="col-12 col-sm-9 text-end"><b>Total Base Credito Fiscal:</b></div>
		<div class="col-12 col-sm-3 text-end"><b><t t-esc="props.invoice.total.toFixed(2)" /></b></div>
		
		<div class="col-12 col-sm-9 text-end"><b>Crédito fiscal:</b></div>
		<div class="col-12 col-sm-3 text-end"><b><t t-esc="props.invoice.total_tax.toFixed(2)" /></b></div>
	</div>`;
	static props = {invoice: {type: Object, required: true}};
	/*
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
	*/
	mounted()
	{
		this.monto_arrendamiento = 0;
	}
	setup()
	{
	    onMounted( () => this.mounted());

	}
	calculateTotals()
    {
        console.log(this.props.invoice);
        //this.$parent.calculateTotals();
        this.props.invoice.total += isNaN(parseFloat(this.monto_arrendamiento)) ? 0 : parseFloat(this.monto_arrendamiento);
    }
};
export {DetalleFinanciera, ItemFinanciera, FinancieraTotals};