/** @odoo-module **/
const DetalleServiciosBasicos = {
	removeFields: ['numero_serie', 'imei'],
	template: `<div class="serviciosbasicos-detalle">
		<div class="row">
			<div class="col-4 col-sm-2">
				<div class="mb-2">
					<label>Mes</label>
					<select class="form-control form-select" required v-model="invoice.data.custom_fields.mes" required>
						<option v-bind:value="month" v-for="(month, mi) in months">{{ month }}</option>
					</select>
				</div>
			</div>
			<div class="col-4 col-sm-2">
				<div class="mb-2">
					<label>Gestion</label>
					<input type="text" class="form-control" required v-model="invoice.data.custom_fields.gestion" />
				</div>
			</div>
			<div class="col-4 col-sm-3">
				<div class="mb-2">
					<label>Ciudad</label>
					<input type="text" class="form-control" required v-model="invoice.data.custom_fields.ciudad" />
				</div>
			</div>
			<div class="col-4 col-sm-5">
				<div class="mb-2">
					<label>Zona</label>
					<input type="text" class="form-control" required v-model="invoice.data.custom_fields.zona" />
				</div>
			</div>
			<div class="col-4 col-sm-5">
				<div class="mb-2">
					<label>Domicilio Cliente</label>
					<input type="text" class="form-control" required v-model="invoice.data.custom_fields.domicilioCliente" />
				</div>
			</div>
			<div class="col-4 col-sm-2">
				<div class="mb-2">
					<label>Nro. Medidor</label>
					<input type="text" class="form-control" required v-model="invoice.data.custom_fields.numeroMedidor" />
				</div>
			</div>
			<div class="col-4 col-sm-2">
				<div class="mb-2">
					<label>Consumo Periodo</label>
					<input type="text" class="form-control" required v-model="invoice.data.custom_fields.consumoPeriodo" />
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-4 col-sm-3">
				<div class="mb-2">
					<label>CI Beneficiario Ley 1886</label>
					<input type="text" class="form-control" v-model="invoice.data.custom_fields.beneficiarioLey1886" />
				</div>
			</div>
			<div class="col-4 col-sm-3">
				<div class="mb-2">
					<label>Monto Descuento Ley 1886</label>
					<input type="text" class="form-control" required v-model="invoice.data.custom_fields.montoDescuentoLey1886" />
				</div>
			</div>
			<div class="col-4 col-sm-3">
				<div class="mb-2">
					<label>Monto Desc. Tarifa Dignidad</label>
					<input type="text" class="form-control" required v-model="invoice.data.custom_fields.montoDescuentoTarifaDignidad" />
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
			months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		};
	},
	mounted()
	{
		
	},
	created()
	{
		//this.invoice.data.custom_fields.periodoFacturado = sb_formatdate(new Date(), 'Y-m-d');
		const dd = new Date();
		this.invoice.data.custom_fields.mes = this.months[dd.getMonth()];
		this.invoice.data.custom_fields.gestion = dd.getFullYear();
		this.invoice.data.custom_fields.montoDescuentoLey1886 = 0;
		this.invoice.data.custom_fields.montoDescuentoTarifaDignidad = 0;
		//this.invoice.data.custom_fields.tasaAseo = 0;
		//this.invoice.data.custom_fields.tasaAlumbrado = 0;
		//this.invoice.data.custom_fields.otrasTasas = 0;
	}
};
const ItemServiciosBasicos = {
	
};
const TotalsServiciosBasicos = {
	template: `<div id="com-serviciosbasicos-totals">
		<fieldset>
			<h5>Ajustes No Sujetos IVA <button type="button" class="btn btn-primary btn-sm" v-on:click="addAjusteNoIVA()"><i class="fa fa-plus"></i></button></h5>
			<table class="table table-consended table-sm">
			<tr v-for="(item, index) in ajustes_no_iva">
				<td><input type="text" class="form-control" placeholder="Detalle" v-model="item.name" /></td>
				<td><input type="text" class="form-control text-right text-end" placeholder="Monto" v-model="item.value" v-on:keyup="calculateTotals()" /></td>
				<td><a href="javascript:" class="btn btn-danger btn-sm" v-on:click="removeAjusteNoIVA(index, item)"><i class="fa fa-trash"></i></a></td>
			</tr>
			</table>
		</fieldset>
		<fieldset>
			<h5>Ajustes Sujetos IVA <button type="button" class="btn btn-primary btn-sm" v-on:click="addAjusteIVA()"><i class="fa fa-plus"></i></button></h5>
			<table class="table table-consended table-sm">
			<tr v-for="(item, index) in ajustes_iva">
				<td><input type="text" class="form-control" placeholder="Detalle" v-model="item.name" /></td>
				<td><input type="text" class="form-control text-right text-end" placeholder="Monto" v-model="item.value" v-on:keyup="calculateTotals()" /></td>
				<td><a href="javascript:" class="btn btn-danger btn-sm" v-on:click="removeAjusteIVA(index, item)"><i class="fa fa-trash"></i></a></td>
			</tr>
			</table>
		</fieldset>
		<fieldset>
			<h5>Otros Pago No Sujetos IVA <button type="button" class="btn btn-primary btn-sm" v-on:click="addOtrosNoIVA()"><i class="fa fa-plus"></i></button></h5>
			<table class="table table-consended table-sm">
			<tr v-for="(item, index) in otros_pagos_no_iva">
				<td><input type="text" class="form-control" placeholder="Detalle" v-model="item.name" /></td>
				<td><input type="text" class="form-control text-right text-end" placeholder="Monto" v-model="item.value" v-on:keyup="calculateTotals()" /></td>
				<td><a href="javascript:" class="btn btn-danger btn-sm" v-on:click="removeOtrosNoIVA(index, item)"><i class="fa fa-trash"></i></a></td>
			</tr>
			</table>
		</fieldset>
		<div class="row">
			<div class="col-12 col-sm-9 text-end"><b>Total Detalle:</b></div>
			<div class="col-12 col-sm-3 text-end"><b>{{ invoice.subtotal.toFixed(2) }}</b></div>
		</div>
		<div class="row">
			<div class="col-12 col-sm-9 text-end"><b>Tasa de Aseo:</b></div>
			<div class="col-12 col-sm-3 text-end">
				<input type="text" class="form-control text-end" v-model="tasaAseo"/>
			</div>
		</div>
		<div class="row">
			<div class="col-12 col-sm-9 text-end"><b>Tasa de Alumbrado:</b></div>
			<div class="col-12 col-sm-3 text-end">
				<input type="text" class="form-control text-end" v-model="tasaAlumbrado"/>
			</div>
		</div>
		<div class="row">
			<div class="col-12 col-sm-9 text-end"><b>Otras Tasas:</b></div>
			<div class="col-12 col-sm-3 text-end">
				<input type="text" class="form-control text-end" v-model="otrasTasas"/>
			</div>
		</div>
		<div class="row">
			<div class="col-12 col-sm-9 text-end"><b>Ajuste Sujeto IVA:</b></div>
			<div class="col-12 col-sm-3 text-end"><b>{{ invoice.data.custom_fields.ajusteSujetoIva.toFixed(2) }}</b></div>
		</div>
		<div class="row">
			<div class="col-12 col-sm-9 text-end"><b>Otros Pagos No Sujetos IVA:</b></div>
			<div class="col-12 col-sm-3 text-end"><b>{{ invoice.data.custom_fields.otrosPagosNoSujetoIva.toFixed(2) }}</b></div>
		</div>
		<div class="row">
			<div class="col-12 col-sm-9 text-end"><b>Descuento:</b></div>
			<div class="col-12 col-sm-3 text-end">
				<input type="text" class="form-control text-end" v-model="invoice.discount"/>
			</div>
		</div>
		<div class="row">
			<div class="col-12 col-sm-9 text-end"><b>Monto total a pagar:</b></div>
			<div class="col-12 col-sm-3 text-end"><b>{{ invoice.total.toFixed(2) }}</b></div>
		</div>
		<div class="row">
			<div class="col-12 col-sm-9 text-end"><b>Monto Total Subjeto IVA:</b></div>
			<div class="col-12 col-sm-3 text-end"><b>{{ total_sujeto_iva.toFixed(2) }}</b></div>
		</div>
	</div>`,
	props: 
	{
		invoice: {type: Object, required: true}
	},
	watch: 
	{
		'invoice.subtotal'()
		{
			this.calculateTotals();
		},
		tasaAseo(){this.calculateTotals();},
		tasaAlumbrado(){this.calculateTotals();},
		otrasTasas(){this.calculateTotals();},
	},
	data()
	{
		return {
			total_sujeto_iva: 0,
			ajustes_no_iva: [],
			ajustes_iva: [],
			otros_pagos_no_iva: [],
			tasaAseo: 0,
			tasaAlumbrado: 0,
			otrasTasas: 0,
		};
	},
	methods: 
	{
		addAjusteNoIVA()
		{
			this.ajustes_no_iva.push({
				name: '',
				value: 0
			});	
		},
		removeAjusteNoIVA(index, item)
		{
			this.ajustes_no_iva.splice(index, 1);
			this.calculateTotals();
		},
		addAjusteIVA()
		{
			this.ajustes_iva.push({
				name: '',
				value: 0
			});	
		},
		removeAjusteIVA(index, item)
		{
			this.ajustes_iva.splice(index, 1);
			this.calculateTotals();
		},
		addOtrosNoIVA()
		{
			this.otros_pagos_no_iva.push({
				name: '',
				value: 0
			});	
		},
		removeOtrosNoIVA(index, item)
		{
			this.otros_pagos_no_iva.splice(index, 1);
			this.calculateTotals();
		},
		calculateTotals()
		{
			let total 			= 0;
			let ajustesNoIVA 	= 0;
			let ajustesIVA 		= 0;
			let otrosPagosNoIVA = 0;
			this.invoice.data.custom_fields.detalleAjusteSujetoIva = [];
			this.invoice.data.custom_fields.detalleAjusteNoSujetoIva = [];
			this.invoice.data.custom_fields.detalleOtrosPagosNoSujetoIva = [];
			console.log('calculateTotals');
			try
			{
				for(let item of this.ajustes_no_iva)
				{
					ajustesNoIVA += isNaN(parseFloat(item.value)) ? 0 : parseFloat(item.value);
					let data = {};
					data[item.name] = isNaN(parseFloat(item.value)) ? 0 : parseFloat(item.value);
					this.invoice.data.custom_fields.detalleAjusteNoSujetoIva.push(data);
				}	
				for(let item of this.ajustes_iva)
				{
					ajustesIVA += isNaN(parseFloat(item.value)) ? 0 : parseFloat(item.value);
					let data = {};
					data[item.name] = isNaN(parseFloat(item.value)) ? 0 : parseFloat(item.value);
					this.invoice.data.custom_fields.detalleAjusteSujetoIva.push(data);
				}
				for(let item of this.otros_pagos_no_iva)
				{
					otrosPagosNoIVA += isNaN(parseFloat(item.value)) ? 0 : parseFloat(item.value);
					let data = {};
					data[item.name] = isNaN(parseFloat(item.value)) ? 0 : parseFloat(item.value);
					this.invoice.data.custom_fields.detalleOtrosPagosNoSujetoIva.push(data);
				}	
				this.invoice.data.custom_fields.tasaAseo 		= isNaN(parseFloat(this.tasaAseo)) ? 0 : parseFloat(this.tasaAseo);
				this.invoice.data.custom_fields.tasaAlumbrado 	= isNaN(parseFloat(this.tasaAlumbrado)) ? 0 : parseFloat(this.tasaAlumbrado);
				this.invoice.data.custom_fields.otrasTasas 		= isNaN(parseFloat(this.otrasTasas)) ? 0 : parseFloat(this.otrasTasas);
				this.invoice.data.custom_fields.ajusteSujetoIva 		= ajustesIVA;
				this.invoice.data.custom_fields.ajusteNoSujetoIva 		= ajustesNoIVA;
				this.invoice.data.custom_fields.otrosPagosNoSujetoIva 	= otrosPagosNoIVA;
				total = this.invoice.subtotal;
				total += this.invoice.data.custom_fields.tasaAseo;
				total += this.invoice.data.custom_fields.tasaAlumbrado;
				total += this.invoice.data.custom_fields.otrasTasas;
				total += ajustesIVA;
				total += otrosPagosNoIVA;
				total -= this.invoice.discount;
				this.invoice.total = total;
				
				this.total_sujeto_iva = total - this.invoice.data.custom_fields.tasaAseo;
				this.total_sujeto_iva -= this.invoice.data.custom_fields.tasaAlumbrado;
				this.total_sujeto_iva -= this.invoice.data.custom_fields.otrasTasas;
				this.total_sujeto_iva -= otrosPagosNoIVA;
			}
			catch(e)
			{
				console.log('TOTALS ERROR', e);
			}
		}
	},
	mounted()
	{
		
	},
	created()
	{
		if( !this.invoice.data.custom_fields )
			this.invoice.data.custom_fields = {};
			
		this.invoice.data.custom_fields.tasaAseo = 0;
		this.invoice.data.custom_fields.tasaAlumbrado = 0;
		this.invoice.data.custom_fields.otrasTasas = 0;
		this.invoice.data.custom_fields.ajusteSujetoIva = 0;
		this.invoice.data.custom_fields.otrosPagosNoSujetoIva = 0;
		
	}
};
	
export {DetalleServiciosBasicos, ItemServiciosBasicos, TotalsServiciosBasicos};