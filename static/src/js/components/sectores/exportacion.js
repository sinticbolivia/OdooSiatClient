/** @odoo-module **/
import {SiatModel} from '../../siat_model';

const DetalleExportacion = {
	removeFields: ['numero_serie', 'imei'],
	template: `<div class="exportacion-servicio-detalle">
		<div class="row">
			<div class="col-12 col-sm-3">
				<div class="mb-2">
					<label>Direccion Comprador</label>
					<input type="text" class="form-control" required v-model="invoice.data.custom_fields.direccionComprador" />
				</div>
			</div>
			<div class="col-13 col-sm-3">
				<div class="mb-2">
					<label>Puerto Destino</label>
					<input type="text" class="form-control" required v-model="invoice.data.custom_fields.puertoDestino" />
				</div>
			</div>
			<div class="col-13 col-sm-3">
				<div class="mb-2">
					<label>Lugar Destino</label>
					<input type="text" class="form-control" required v-model="invoice.data.custom_fields.lugarDestino" />
				</div>
			</div>
			<div class="col-12 col-sm-3">
				<div class="mb-2">
					<label>Codigo Pais</label>
					<select v-if="paises.length" required v-model="invoice.data.custom_fields.codigoPais" class="form-control form-select">
						<option value="">-- pais --</option>
						<option v-bind:value="pais.codigoClasificador" v-for="pais in paises">{{ pais.descripcion }} [{{ pais.codigoClasificador }}]</option>
					</select>
					<input v-else type="text" class="form-control" required v-model="invoice.data.custom_fields.codigoPais" />
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12 col-sm-3">
				<div class="mb-2">
					<label>Incoterm</label>
					<input type="text" class="form-control" required v-model="invoice.data.custom_fields.incoterm" />
				</div>
			</div>
			<div class="col-12 col-sm-3">
				<div class="mb-2">
					<label>Incoterm Detalle</label>
					<input type="text" class="form-control" required v-model="invoice.data.custom_fields.incotermDetalle" />
				</div>
			</div>
			<div class="col-13 col-sm-6">
				<div class="mb-2">
					<label>Informacion adicional</label>
					<textarea class="form-control" v-model="invoice.data.custom_fields.informacionAdicional"></textarea>
				</div>
			</div>
			<div class="col-13 col-sm-6">
				<div class="mb-2">
					<label>Descripcion Paquete Bultos</label>
					<textarea class="form-control" v-model="invoice.data.custom_fields.numeroDescripcionPaquetesBultos"></textarea>
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
			service: new SiatModel(),
			paises: [],
		};
	},
	mounted()
	{
		
	},
	async created()
	{
		this.invoice.data.custom_fields.codigoPais = '';
		this.invoice.data.custom_fields.periodoFacturado = sb_formatdate(new Date(), 'Y-m-d');
		try
		{
			const res = await this.service.obtenerPaises();
			if( res.data )
				this.paises = res.data.RespuestaListaParametricas.listaCodigos;
		}
		catch(e)
		{
			console.error('ERROR obteniendo paises', e);
		}
	}
};
const ItemExportacion = {
	template: `<div class="hospital-item">
		<div class="row">
			<div class="col-12 col-sm-3">
				<div class="mb-2">
					<label>Cod. Nandina</label>
					<input type="text" class="form-control" v-model="item.data.custom_fields.codigoNandina" />
				</div>
			</div>
		</div>
	</div>`,
	props: {
		invoice: {type: Object, required: true},
		item: {type: Object, required: true},
	},
};
const TotalsExportacion = {
	template: `<div id="extra-totals-exportacion" >
		<div class="row">
			<div class="col-12 col-sm-9 text-end"><b>Total Detalle:</b></div>
			<div class="col-12 col-sm-3 text-end"><b>{{ this.subtotal_detalle.toFixed(2) }}</b></div>
		</div>
		
		<fieldset>
			<h5>Desglose de Costos y Gastos Nacionales <button type="button" class="btn btn-primary btn-sm" v-on:click="addGastosNacional()"><i class="fa fa-plus"></i></button></h5>
			<table class="table table-consended table-sm">
			<tr v-for="(item, index) in costos_gastos_nacionales">
				<td><input type="text" class="form-control" v-model="item.name" /></td>
				<td><input type="text" class="form-control text-right text-end" v-model="item.value" v-on:keyup="calculateTotals()" /></td>
				<td><a href="javascript:" class="btn btn-danger btn-sm" v-on:click="removeGastoNacional(index, item)"><i class="fa fa-trash"></i></a></td>
			</tr>
			</table>
		</fieldset>
		<div class="row">
			<div class="col-12 col-sm-9 text-right text-end"><b>SUBTOTAL FOB(FRONTERA) </b></div>
			<div class="col-12 col-sm-3 text-right text-end">
				<b>{{ subtotal_frontera.toFixed(2) }}</b>
			</div>
		</div>
		<fieldset>
			<h5>Desglose de Costos y Gastos Internacionales <button type="button" class="btn btn-primary btn-sm" v-on:click="addGastosInternacional()"><i class="fa fa-plus"></i></button></h5>
			<table class="table table-consended table-sm">
			<tr v-for="(item, index) in costos_gastos_internacionales">
				<td><input type="text" class="form-control" v-model="item.name" /></td>
				<td><input type="text" class="form-control text-right text-end" v-model="item.value" v-on:keyup="calculateTotals()" /></td>
				<td><a href="javascript:" class="btn btn-danger btn-sm" v-on:click="removeGastoInternacional(index, item)"><i class="fa fa-trash"></i></a></td>
			</tr>
			</table>
		</fieldset>
		<div class="row">
			<div class="col-12 col-sm-9 text-right text-end"><b>SUBTOTAL</b></div>
			<div class="col-12 col-sm-3 text-right text-end">
				<b>{{ invoice.subtotal.toFixed(2) }}</b>
			</div>
		</div>
		<div class="row">
			<div class="col-12 col-sm-9 text-right text-end"><b>DESCUENTO</b></div>
			<div class="col-12 col-sm-3 text-right text-end">
				<b>{{ invoice.discount.toFixed(2) }}</b>
			</div>
		</div>
		<div class="row">
			<div class="col-12 col-sm-9 text-right text-end"><b>TOTAL GENERAL</b></div>
			<div class="col-12 col-sm-3 text-right text-end">
				<b>{{ invoice.total.toFixed(2) }}</b>
			</div>
		</div>
		<div class="row">
			<div class="col-12 col-sm-9 text-right text-end"><b>TOTAL GENERAL (BOLIVIANOS)</b></div>
			<div class="col-12 col-sm-3 text-right text-end">
				<b>{{ total_bolivianos.toFixed(2) }}</b>
			</div>
		</div>
	</div>`,
	props: {
		invoice: {type: Object, required: true},
		metodos_pago: {type: Array, required: false}
	},
	computed: 
	{
		
	},
	watch: 
	{
		'invoice.subtotal'()
		{
			this.calculateTotals();
		}	
	},
	data()
	{
		return {
			costos_gastos_nacionales: [],
			costos_gastos_internacionales: [],
			total_costos_gastos_nacionales: 0,
			total_costos_gastos_internacionales: 0,
			subtotal_detalle: 0,
			subtotal_frontera: 0,
			total_bolivianos: 0,
		};
	},
	methods: 
	{
		addGastosNacional()
		{
			this.costos_gastos_nacionales.push({name: 'Detalle del gasto', value: 0.00});
		},
		addGastosInternacional()
		{
			this.costos_gastos_internacionales.push({name: 'Detalle del gasto', value: 0.00});
		},
		removeGastoNacional(index, item)
		{
			this.costos_gastos_nacionales.splice(index, 1);
			this.calculateTotals();
		},
		removeGastoInternacional(index, item)
		{
			this.costos_gastos_internacionales.splice(index, 1);
			this.calculateTotals();
		},
		calculateGastosNacionales()
		{
			this.total_costos_gastos_nacionales = 0;
			for(let item of this.costos_gastos_nacionales)
			{
				item.value = isNaN( parseFloat(item.value) ) ? 0 : parseFloat(item.value)
				this.total_costos_gastos_nacionales += item.value;
			}
			
			return this.total_costos_gastos_nacionales;
		},
		calculateGastosInternacionales()
		{
			this.total_costos_gastos_internacionales = 0;
			for(let item of this.costos_gastos_internacionales)
			{
				item.value = isNaN( parseFloat(item.value) ) ? 0 : parseFloat(item.value);
				this.total_costos_gastos_internacionales += item.value;
			}
			return this.total_costos_gastos_internacionales;	
		},
		calculateTotalDetalle()
		{
			this.subtotal_detalle = 0;
			for(let item of this.invoice.items)
			{
				this.subtotal_detalle += item.total;
			}
		},
		calculateTotals()
		{
			this.invoice.data.custom_fields.costosGastosNacionales = {};
			this.invoice.data.custom_fields.totalGastosNacionalesFob = 0;
			this.invoice.data.custom_fields.costosGastosInternacionales = {};
			this.invoice.data.custom_fields.totalGastosInternacionales = 0;
		
			this.calculateTotalDetalle();
			this.calculateGastosNacionales();
			this.calculateGastosInternacionales();
			
			this.subtotal_frontera = this.subtotal_detalle + this.total_costos_gastos_nacionales;
			this.invoice.subtotal = this.subtotal_frontera + this.total_costos_gastos_internacionales;
			this.invoice.total = this.invoice.subtotal - this.invoice.discount;
			this.total_bolivianos = this.invoice.total * (isNaN(parseFloat(this.invoice.tipo_cambio)) ? 1 : parseFloat(this.invoice.tipo_cambio));
			
			//this.invoice.data.custom_fields.costosGastosNacionales 		= this.costos_gastos_nacionales;
			this.invoice.data.custom_fields.totalGastosNacionalesFob 	= this.total_costos_gastos_nacionales;
			//this.invoice.data.custom_fields.costosGastosInternacionales = this.costos_gastos_internacionales;
			this.invoice.data.custom_fields.totalGastosInternacionales 	= this.total_costos_gastos_internacionales;
			for(let item of this.costos_gastos_nacionales)
			{
				//let data = {};
				//data[item.name] = item.value;
				//this.invoice.data.custom_fields.costosGastosNacionales.push(data);
				this.invoice.data.custom_fields.costosGastosNacionales[item.name] = item.value;
			}
			for(let item of this.costos_gastos_internacionales)
			{
				//let data = {};
				//data[item.name] = item.value;
				//this.invoice.data.custom_fields.costosGastosInternacionales.push(data);
				this.invoice.data.custom_fields.costosGastosInternacionales[item.name] = item.value;
			}
			
		}
	},
	mounted()
	{
		
	},
	created()
	{
		/*
		this.invoice.data.custom_fields.costosGastosNacionales = [];
		this.invoice.data.custom_fields.totalGastosNacionalesFob = 0;
		
		this.invoice.data.custom_fields.costosGastosInternacionales = [];
		this.invoice.data.custom_fields.totalGastosInternacionales = 0;
		*/
	}
}
export {DetalleExportacion, ItemExportacion, TotalsExportacion};