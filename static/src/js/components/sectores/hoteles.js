/** @odoo-module **/
import { Component, onMounted, onWillStart, useState, xml } from "@odoo/owl";

class DetalleHotel extends Component
{
	static template = xml`<div class="hotel-detalle">
		<div class="row">
			<div class="col-6 col-sm-2">
				<div class="mb-2">
					<label>Nro. Huespedes</label>
					<input type="number" min="1" class="form-control" t-model="cantidadHuespedes" required="" />
				</div>
			</div>
			<div class="col-6 col-sm-2">
				<div class="mb-2">
					<label>Nro. Habitaciones</label>
					<input type="number" min="1" class="form-control" t-model="cantidadHabitaciones" required="" />
				</div>
			</div>
			<div class="col-6 col-sm-2">
				<div class="mb-2">
					<label>Nro Adultos</label>
					<input type="number" min="1" value="1" class="form-control" t-model="cantidadMayores" required="" />
				</div>
			</div>
			<div class="col-6 col-sm-2">
				<div class="mb-2">
					<label>Nro Menores</label>
					<input type="number" min="0" value="0" class="form-control" t-model="cantidadMenores" required="" />
				</div>
			</div>
			<div class="col-12 col-sm-2">
				<div class="mb-2">
					<label>Fecha Ingreso</label>
					<input type="date" class="form-control" required="" t-model="fecha_ingreso" />
				</div>
			</div>
			<div class="col-12 col-sm-2">
				<div class="mb-2">
					<label>Hora Ingreso</label>
					<input type="time" class="form-control" t-model="hora_ingreso" />
				</div>
			</div>
		</div>
	</div>`;
	static props = {
		invoice: {type: Object, optional: false},
	};
	/*
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
	*/
	getFechaHoraIngreso()
    {
        let date = new Date(this.fecha_ingreso + ' ' + this.hora_ingreso);
        //console.log('fechaHoraIngreso', date);
        return date;
    }
    onInvoiceItemAdd(e)
    {
        //console.log('detail', e.detail.item);
        e.detail.item.data.custom_fields.codigoTipoHabitacion = 1;
    }
	mounted()
	{
		this.fecha_ingreso = luxon.DateTime.local().toFormat('yyyy-MM-dd');
		this.hora_ingreso = luxon.DateTime.local().toFormat('HH:mm'); + ':00.00';
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
	}
	setup()
	{
	    this.state = useState({
			cantidadHuespedes: 1,
			cantidadHabitaciones: 1,
			cantidadMayores: 1,
			cantidadMenores: 0,
			fecha_ingreso: luxon.DateTime.local().toFormat('yyyy-MM-dd'),
			hora_ingreso: luxon.DateTime.local().toFormat('HH:mm') + ':00.00',
	    });
		onMounted(() => this.mounted());
	}
	beforeDestroy()
	{
		console.log('hoteles', 'beforeDestroy');
		document.removeEventListener('invoice_add_item', this.onInvoiceItemAdd);
	}
};
class ItemHotel extends Component
{
	static template = xml`<div>
		<div class="row">
			<div class="col-12 col-sm-4">
				<div class="mb-2">
					<label>Cod. Tipo Habitacion</label>
					<select class="form-control form-select" t-model="tipo_habitacion" required="">
						<t t-foreach="props.tipos_habitacion.RespuestaListaParametricas.listaCodigos" t-as="th" t-key="th_index">
							<option t-att-value="th.codigoClasificador">
								<t t-esc="th.descripcion" />
							</option>
						</t>
					</select>
				</div>
			</div>
			<div class="col-12 col-sm-8">
				<h3>
				    Huespedes <button type="button" class="btn btn-sm btn-primary" t-on-click="adicionarHuesped">
				    <i class="fa fa-plus"></i> Adicionar</button>
				</h3>
				<template v-if="item.data.custom_fields.detalleHuespedes">
					<div class="row" t-foreach="huespedes" t-as="h" t-index="h_index">
						<div class="col-12 col-sm-4">
							<div class="mb-2">
								<label>Nombre</label>
								<input type="text" class="form-control form-control-sm" t-model="h.nombreHuesped" />
							</div>
						</div>
						<div class="col-12 col-sm-3">
							<div class="mb-2">
								<label>Doc. Identidad</label>
								<input type="text" class="form-control form-control-sm" t-model="h.documentoIdentificacion" />
							</div>
						</div>
						<div class="col-12 col-sm-3">
							<div class="mb-2">
								<label>Pais</label>
								<input type="text" class="form-control form-control-sm" t-model="h.codigoPais" />
							</div>
						</div>
						<div class="col-12 col-sm-2">
							<button type="button" class="btn btn-sm btn-danger" t-on-click="quitarHuesped(h, hi)"><i class="fa fa-trash"></i></button>
						</div>
					</div>
				</template>
			</div>
		</div>
	</div>`;
	static props = {
		invoice: {type: Object, optional: false},
		item: {type: Object, optional: false},
		tipos_habitacion: {type: Array, optional: false},
	};
	/*
	watch: 
	{
		tipo_habitacion(nv, ov)
		{
			//console.log(nv, ov);
			this.item.data.custom_fields.codigoTipoHabitacion = nv;
		}
	},
	*/
	adicionarHuesped()
    {
        this.huespedes.push({
            nombreHuesped: '',
            documentoIdentificacion: '',
            codigoPais: '',
        });
        this.item.data.custom_fields.detalleHuespedes = this.huespedes;
    }
    quitarHuesped(h, index)
    {
        this.huespedes.splice(index, 1);
        this.item.data.custom_fields.detalleHuespedes = this.huespedes;
    }
	mounted()
	{
		//this.item.data.custom_fields.codigoTipoHabitacion = 0;
		if( !this.item.data.custom_fields.detalleHuespedes || !Array.isArray(this.item.data.custom_fields.detalleHuespedes) )
			this.item.data.custom_fields.detalleHuespedes = [];
		this.huespedes = this.item.data.custom_fields.detalleHuespedes;
		//console.log('tipoHabitacion', this.item.data.custom_fields.codigoTipoHabitacion);
		if( !this.item.data.custom_fields.codigoTipoHabitacion )
			this.item.data.custom_fields.codigoTipoHabitacion = 1;
		this.tipo_habitacion = this.item.data.custom_fields.codigoTipoHabitacion;
	}
	setup()
	{
	    this.state = useState({
			tipo_habitacion: 1,
			huespedes: [],
		});
		onMounted(() => this.mounted());
	}
};
export {DetalleHotel, ItemHotel};