/** @odoo-module **/
import {Component, onMounted, useState, xml} from '@odoo/owl';
import {useService} from '@web/core/utils/hooks';

class DetalleBoletoAereo extends Component
{
	static template = xml`<div>
		<div class="row">
			<div class="col-6 col-sm-3">
				<div class="mb-2">
					<label>Nombre Pasajero <i class="text-danger">*</i></label>
					<input type="text" class="form-control" required="" t-model="props.invoice.data.custom_fields.nombrePasajero" />
				</div>
			</div>
			<div class="col-6 col-sm-3">
				<div class="mb-2">
					<label>Nro. Doc. Pasajero</label>
					<input type="text" class="form-control" t-model="props.invoice.data.custom_fields.numeroDocumentoPasajero" />
				</div>
			</div>
			<div class="col-6 col-sm-3">
				<div class="mb-2">
					<label>Monto Tarifa <i class="text-danger">*</i></label>
					<input type="text" class="form-control" required="" t-model="props.invoice.data.custom_fields.montoTarifa" />
				</div>
			</div>
			<div class="col-6 col-sm-3">
				<div class="mb-2">
					<label>Cod. Tipo Transaccion <i class="text-danger">*</i></label>
					<input type="text" class="form-control" required="" t-model="props.invoice.data.custom_fields.codigoTipoTransaccion" />
				</div>
			</div>
			<div class="col-6 col-sm-3">
				<div class="mb-2">
					<label>Cod. Iata Linea Aerea <i class="text-danger">*</i></label>
					<input type="text" class="form-control" required="" t-model="props.invoice.data.custom_fields.codigoIataLineaAerea" />
				</div>
			</div>
			<div class="col-6 col-sm-3">
				<div class="mb-2">
					<label>Cod. Iata Agente Viajes</label>
					<input type="text" class="form-control" t-model="props.invoice.data.custom_fields.codigoIataAgenteViajes" />
				</div>
			</div>
			<div class="col-6 col-sm-3">
				<div class="mb-2">
					<label>NIT Agente Viajes</label>
					<input type="text" class="form-control" t-model="props.invoice.data.custom_fields.nitAgenteViajes" />
				</div>
			</div>
			<div class="col-6 col-sm-3">
				<div class="mb-2">
					<label>Cod. Origen Servicio <i class="text-danger">*</i></label>
					<input type="text" class="form-control" required="" t-model="props.invoice.data.custom_fields.codigoOrigenServicio" />
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
	        this.props.invoice.data.custom_fields.nombrePasajero = '';
            this.props.invoice.data.custom_fields.numeroDocumentoPasajero = '';
            this.props.invoice.data.custom_fields.codigoIataLineaAerea = '';
            this.props.invoice.data.custom_fields.codigoIataAgenteViajes = '';
            this.props.invoice.data.custom_fields.nitAgenteViajes = '';
            this.props.invoice.data.custom_fields.codigoOrigenServicio = '';
            this.props.invoice.data.custom_fields.montoTarifa = '';
            this.props.invoice.data.custom_fields.codigoTipoTransaccion = '';
	    });

	}
};
class TotalsBoletoAereo extends Component {
	static template = xml`<div class="row border-bottom">
	    <div class="col-12 col-sm-9 text-end text-right"><b>Subtotal:</b></div>
        <div class="col-12 col-sm-3 text-end text-right"><b><t t-out="props.invoice.subtotal.toFixed(2)" /></b></div>

        <div class="col-12 col-sm-9 text-end text-right"><b>Total Base Credito Fiscal:</b></div>
        <div class="col-12 col-sm-3 text-end text-right"><b><t t-out="props.invoice.total.toFixed(2)" /></b></div>

        <div class="col-12 col-sm-9 text-end text-right"><b>Credito fiscal:</b></div>
        <div class="col-12 col-sm-3 text-end text-right"><b><t t-out="props.invoice.total_tax.toFixed(2)" /></b></div>
	</div>`;
	static props = {
	    invoice: {type: Object, optional: false},
	};
	setup(){}
};
export default DetalleBoletoAereo;
export {DetalleBoletoAereo, TotalsBoletoAereo};