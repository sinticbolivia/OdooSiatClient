/** @odoo-module **/
import { Component, onMounted, onWillStart, useState, xml } from "@odoo/owl";

class FieldSetter
{
	constructor(destObj)
	{
		console.log('destObj', destObj);
		this.obj = destObj;
	}
	set especialidad(val)
	{
		this.obj.custom_fields['especialidad'] = val;
	}
	get especialidad()
	{
		return this.obj.custom_fields['especialidad'];
	}
	set especialidadDetalle(val)
	{
		this.obj.custom_fields['especialidadDetalle'] = val;
	}
	get especialidadDetalle()
	{
		return this.obj.custom_fields['especialidadDetalle'];
	}
	set nroQuirofanoSalaOperaciones(val)
	{
		this.obj.custom_fields['nroQuirofanoSalaOperaciones'] = val;
	}
	get nroQuirofanoSalaOperaciones()
	{
		return this.obj.custom_fields['nroQuirofanoSalaOperaciones'];
	}
	set especialidadMedico(val)
	{
		this.obj.custom_fields['especialidadMedico'] = val;
	}
	get especialidadMedico()
	{
		return this.obj.custom_fields['especialidadMedico'];
	}
}
class DetalleHospital extends Component
{
    setup(){}
}
class ItemHospital extends Component
{
	static template = xml`<div class="hospital-item">
		<div class="row">
			<div class="col-12 col-sm-4">
				<div class="mb-2">
					<label>Especialidad</label>
					<input type="text" class="form-control" t-model="state.obj.especialidad" />
				</div>
			</div>
			<div class="col-12 col-sm-4">
				<div class="mb-2">
					<label>Especialidad Detalle</label>
					<input type="text" class="form-control" t-model="state.obj.especialidadDetalle" />
				</div>
			</div>
			<div class="col-12 col-sm-4">
				<div class="mb-2">
					<label>Nro Quirofano</label>
					<input type="text" class="form-control" t-model="state.obj.nroQuirofanoSalaOperaciones" />
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12 col-sm-4">
				<div class="mb-2">
					<label>Especialidad Medico</label>
					<input type="text" class="form-control" t-model="state.obj.especialidadMedico" />
				</div>
			</div>
			<div class="col-12 col-sm-4">
				<div class="mb-2">
					<label>Nombre Medico</label>
					<input type="text" class="form-control" t-model="props.item.data.custom_fields.nombreApellidoMedico" />
				</div>
			</div>
			<div class="col-12 col-sm-4">
				<div class="mb-2">
					<label>NIT Medico</label>
					<input type="text" class="form-control" t-model="props.item.data.custom_fields.nitDocumentoMedico" />
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12 col-sm-4">
				<div class="mb-2">
					<label>Nro Matricula Medico</label>
					<input type="text" class="form-control" t-model="props.item.data.custom_fields.nroMatriculaMedico" />
				</div>
			</div>
			<div class="col-12 col-sm-4">
				<div class="mb-2">
					<label>Nro. Factura Medico</label>
					<input type="text" class="form-control" t-model="props.item.data.custom_fields.nroFacturaMedico" />
				</div>
			</div>
		</div>
	</div>`;
	static props = {
		invoice: {type: Object, optional: false},
		item: {type: Object, optional: false},
	};
	mounted()
	{
		
	}
	setup()
	{
		this.state = useState({
		    obj: new FieldSetter(this.item.data),
		});
	}
};
export {DetalleHospital, ItemHospital};