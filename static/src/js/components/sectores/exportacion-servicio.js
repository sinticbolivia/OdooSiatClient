/** @odoo-module **/
import {SiatModel} from '../../siat_model';

const DetalleExportacionServicio = {
	removeFields: ['numero_serie', 'imei'],
	template: `<div class="exportacion-servicio-detalle">
		<div class="row">
			<div class="col-12 col-sm-6">
				<div class="mb-2">
					<label>Direccion Comprador</label>
					<input type="text" class="form-control" required v-model="invoice.data.custom_fields.direccionComprador" />
				</div>
			</div>
			<div class="col-13 col-sm-6">
				<div class="mb-2">
					<label>Lugar Destino</label>
					<input type="text" class="form-control" required v-model="invoice.data.custom_fields.lugarDestino" />
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12 col-sm-6">
				<div class="mb-2">
					<label>Codigo Pais</label>
					<select v-if="paises.length" v-model="invoice.data.custom_fields.codigoPais" class="form-control form-select">
						<option value="">-- pais --</option>
						<option v-bind:value="pais.codigoClasificador" v-for="pais in paises">{{ pais.descripcion }} [{{ pais.codigoClasificador }}]</option>
					</select>
					<input v-else type="text" class="form-control" required v-model="invoice.data.custom_fields.codigoPais" />
				</div>
			</div>
			<div class="col-13 col-sm-6">
				<div class="mb-2">
					<label>Informacion adicional</label>
					<textarea class="form-control" v-model="invoice.data.custom_fields.informacionAdicional"></textarea>
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
		this.invoice.data.custom_fields.periodoFacturado = sb_formatdate(new Date(), 'Y-m-d');
		this.invoice.data.custom_fields.codigoPais = '';
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
const ItemExportacionServicio = {
	
};
	
export {DetalleExportacionServicio, ItemExportacionServicio};