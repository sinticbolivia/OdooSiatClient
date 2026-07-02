/** @odoo-module **/
const DetalleHotel = {
	removeFields: ['numero_serie', 'imei'],
	template: `<div class="hotel-detalle">
		<div class="row">
			<div class="col-6 col-sm-2">
				<div class="mb-2">
					<label>Nro. Huespedes</label>
					<input type="number" min="1" class="form-control" v-model="cantidadHuespedes" required />
				</div>
			</div>
			<div class="col-6 col-sm-2">
				<div class="mb-2">
					<label>Nro. Habitaciones</label>
					<input type="number" min="1" class="form-control" v-model="cantidadHabitaciones" required />
				</div>
			</div>
			<div class="col-6 col-sm-2">
				<div class="mb-2">
					<label>Nro Adultos</label>
					<input type="number" min="1" value="1" class="form-control" v-model="cantidadMayores" required />
				</div>
			</div>
			<div class="col-6 col-sm-2">
				<div class="mb-2">
					<label>Nro Menores</label>
					<input type="number" min="0" value="0" class="form-control" v-model="cantidadMenores" required />
				</div>
			</div>
			<div class="col-12 col-sm-2">
				<div class="mb-2">
					<label>Fecha Ingreso</label>
					<input type="date" class="form-control" required v-model="fecha_ingreso" />
				</div>
			</div>
			<div class="col-12 col-sm-2">
				<div class="mb-2">
					<label>Hora Ingreso</label>
					<input type="time" class="form-control" v-model="hora_ingreso" />
				</div>
			</div>
		</div>
	</div>`,
	props: {
		invoice: {type: Object, required: true},
	},
	watch: 
	{
		cantidadHuespedes(nv, ov)
		{
			this.invoice.data.custom_fields.cantidadHuespedes = nv;
		},
		cantidadHabitaciones(nv, ov)
		{
			this.invoice.data.custom_fields.cantidadHabitaciones = nv;
		},
		cantidadMayores(nv, ov)
		{
			this.invoice.data.custom_fields.cantidadMayores = nv;
		},
		cantidadMenores(nv, ov)
		{
			this.invoice.data.custom_fields.cantidadMenores = nv;
		},
		fecha_ingreso(nv, ov)
		{
			console.log('fecha_ingreso', this.fecha_ingreso);
		},
		hora_ingreso()
		{
			console.log('hora_ingreso', this.hora_ingreso);
		}
	},
	data()
	{
		return {
			cantidadHuespedes: 1,
			cantidadHabitaciones: 1,
			cantidadMayores: 1,
			cantidadMenores: 0,
			fecha_ingreso: sb_formatdate(new Date(), 'Y-m-d'),
			hora_ingreso: sb_formatdate(new Date(), 'H:i') + ':00.00',
		};
	},
	methods:
	{
		getFechaHoraIngreso()
		{
			let date = new Date(this.fecha_ingreso + ' ' + this.hora_ingreso);
			//console.log('fechaHoraIngreso', date);
			return date;
		},
		onInvoiceItemAdd(e)
		{
			//console.log('detail', e.detail.item);
			e.detail.item.data.custom_fields.codigoTipoHabitacion = 1;
		}
	},
	mounted()
	{
		this.fecha_ingreso = sb_formatdate(new Date(), 'Y-m-d');
		this.hora_ingreso = sb_formatdate(new Date(), 'H:i') + ':00.00';
	},
	created()
	{
		if( !this.invoice.data.custom_fields.cantidadHuespedes )
			this.invoice.data.custom_fields.cantidadHuespedes = this.cantidadHuespedes;
		else
			this.cantidadHuespedes = this.invoice.data.custom_fields.cantidadHuespedes;
			
		if( this.invoice.data.custom_fields.cantidadHabitaciones )
			this.cantidadHabitaciones = this.invoice.data.custom_fields.cantidadHabitaciones;
		else
			this.invoice.data.custom_fields.cantidadHabitaciones = this.cantidadHabitaciones;
			
		if( this.invoice.data.custom_fields.cantidadMayores )
			this.cantidadMayores = this.invoice.data.custom_fields.cantidadMayores;
		else
			this.invoice.data.custom_fields.cantidadMayores = this.cantidadMayores;
			
		if( this.invoice.data.custom_fields.cantidadMenores )
			this.cantidadMenores = this.invoice.data.custom_fields.cantidadMenores;
		else
			this.invoice.data.custom_fields.cantidadMenores = this.cantidadMenores;
		//##for detail
		document.addEventListener('invoice_add_item', this.onInvoiceItemAdd);
		
	},
	beforeDestroy()
	{
		console.log('hoteles', 'beforeDestroy');
		document.removeEventListener('invoice_add_item', this.onInvoiceItemAdd);
	}
};
const ItemHotel = {
	template: `<div>
		<div class="row">
			<div class="col-12 col-sm-4">
				<div class="mb-2">
					<label>Cod. Tipo Habitacion</label>
					<select class="form-control form-select" v-model="tipo_habitacion" required>
						<template v-for="(th, thi) in this.tipos_habitacion.RespuestaListaParametricas.listaCodigos">
							<option v-bind:value="th.codigoClasificador">
								{{ th.descripcion }}
							</option>
						</template>
					</select>
				</div>
			</div>
			<div class="col-12 col-sm-8">
				<h3>Huespedes <button type="button" class="btn btn-sm btn-primary" v-on:click="adicionarHuesped()"><i class="fa fa-plus"></i> Adicionar</button></h3>
				<template v-if="item.data.custom_fields.detalleHuespedes">
					<div class="row" v-for="(h, hi) in huespedes">
						<div class="col-12 col-sm-4">
							<div class="mb-2">
								<label>Nombre</label>
								<input type="text" class="form-control form-control-sm" v-model="h.nombreHuesped" />
							</div>
						</div>
						<div class="col-12 col-sm-3">
							<div class="mb-2">
								<label>Doc. Identidad</label>
								<input type="text" class="form-control form-control-sm" v-model="h.documentoIdentificacion" />
							</div>
						</div>
						<div class="col-12 col-sm-3">
							<div class="mb-2">
								<label>Pais</label>
								<input type="text" class="form-control form-control-sm" v-model="h.codigoPais" />
							</div>
						</div>
						<div class="col-12 col-sm-2">
							<button type="button" class="btn btn-sm btn-danger" v-on:click="quitarHuesped(h, hi)"><i class="fa fa-trash"></i></button>
						</div>
					</div>
				</template>
			</div>
		</div>
	</div>`,
	props: {
		invoice: {type: Object, required: true},
		item: {type: Object, required: true},
		tipos_habitacion: {type: Array, required: true},
	},
	watch: 
	{
		tipo_habitacion(nv, ov)
		{
			//console.log(nv, ov);
			this.item.data.custom_fields.codigoTipoHabitacion = nv;
		}
	},
	data()
	{
		return {
			tipo_habitacion: 1,
			huespedes: [],
		};	
	},
	methods: 
	{
		adicionarHuesped()
		{
			this.huespedes.push({
				nombreHuesped: '',
				documentoIdentificacion: '',
				codigoPais: '',
			});
			this.item.data.custom_fields.detalleHuespedes = this.huespedes;
		},
		quitarHuesped(h, index)
		{
			this.huespedes.splice(index, 1);
			this.item.data.custom_fields.detalleHuespedes = this.huespedes;
		}
	},
	mounted()
	{
		//this.item.data.custom_fields.codigoTipoHabitacion = 0;
	},
	created()
	{
		if( !this.item.data.custom_fields.detalleHuespedes || !Array.isArray(this.item.data.custom_fields.detalleHuespedes) )
			this.item.data.custom_fields.detalleHuespedes = [];
		this.huespedes = this.item.data.custom_fields.detalleHuespedes;
		//console.log('tipoHabitacion', this.item.data.custom_fields.codigoTipoHabitacion);
		if( !this.item.data.custom_fields.codigoTipoHabitacion )
			this.item.data.custom_fields.codigoTipoHabitacion = 1;
		this.tipo_habitacion = this.item.data.custom_fields.codigoTipoHabitacion;
		
	}
};
export {DetalleHotel, ItemHotel};