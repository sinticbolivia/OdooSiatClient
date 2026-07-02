/** @odoo-module **/
const DetalleHidrocarburos = {
	removeFields: ['numero_serie', 'imei'],
	template: `<div>
		<div class="row">
			<div class="col-12 col-sm-3">
				<div class="mb-2">
					<label>Placa Vehiculo</label>
					<input type="text" class="form-control" required v-model="invoice.data.custom_fields.placaVehiculo" />
				</div>
			</div>
			<div class="col-12 col-sm-3">
				<div class="mb-2">
					<label>Codigo Pais</label>
					<input type="text" class="form-control" v-model="invoice.data.custom_fields.codigoPais" />
				</div>
			</div>
			<div class="col-12 col-sm-3">
				<div class="mb-2">
					<label>Tipo Envase</label>
					<input type="text" class="form-control" v-model="invoice.data.custom_fields.tipoEnvase" />
				</div>
			</div>
			<div class="col-12 col-sm-3">
				<div class="mb-2">
					<label>
						Codigo Autorizacion SC 
						<i class="fa fa-info" data-bs-toggle="tooltip" data-bs-title="Número de Autorización emitida por la Dirección General de Sutancias Controladas"></i>
					</label>
					<input type="text" class="form-control" v-model="invoice.data.custom_fields.codigoAutorizacionSC" />
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
		this.invoice.data.custom_fields.codigoPais = '';
		this.invoice.data.custom_fields.placaVehiculo = '';
		this.invoice.data.custom_fields.tipoEnvase = '';
		this.invoice.data.custom_fields.codigoAutorizacionSC = '';
	}
};
const ItemHidrocarburos = {
	
};

export {DetalleHidrocarburos, ItemHidrocarburos};