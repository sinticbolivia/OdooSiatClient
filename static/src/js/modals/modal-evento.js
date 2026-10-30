/** @odoo-module **/

import { Component, useState, useRef, xml } from '@odoo/owl';
import { useService } from "@web/core/utils/hooks";
import { Dialog } from "@web/core/dialog/dialog";
import { deserializeDate, deserializeDateTime } from "@web/core/l10n/dates";
import { AlertDialog, ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";
import { SiatModel } from '../siat_model';

export class SiatModalEvento extends Component
{
    static bodyTemplate = 'siat_client.modal-evento';
    static footerTemplate = xml`<div>
        <button type="button" class="btn btn-danger" t-on-click="close">Cerrar</button>
        <button type="button" class="btn btn-primary" t-on-click="guardar">Guardar</button>
    </div>`;
    static components = { Dialog };
    static props = {
        close: {type: Function,},
        title: {type: String, optional: false},
        sucursales: {type: Array, optional: false},
        puntosventa: {type: Array, optional: false},
        eventos: {type: Array, optional: false},
        cufds: {type: Array, optional: false},
        onSubmit: {type: Function, optional: true},
    };

    setup()
    {
        super.setup();
        this.orm = useService('orm');
        this.dialogService = useService('dialog');
        this.model = new SiatModel(this.orm);
        this.title = this.props.title;
        this.eventoFechaInicio = useRef('eventofechainicio');
        this.eventoHoraInicio = useRef('eventohorainicio');
        this.eventoFechaFin = useRef('eventofechafin');
        this.eventoHoraFin = useRef('eventohorafin');
        this.state = useState({
            esContingencia: false,
            cufds: [],
            evento: {
                sucursal_id: '',
                puntoventa_id: '',
                evento_id: 0,
                cufd_evento: '',
                fecha_inicio: null,
                fecha_fin: null,
            },
        });
        onWillStart( () => {});
        onMounted( () => {
            this.eventoFechaInicio.el.value = luxon.DateTime.local().toFormat('yyyy-MM-dd');
            this.eventoHoraInicio.el.value = luxon.DateTime.local().toFormat('HH:mm');
        });
    }
    get cufdEvento()
    {
        if( !this.state.evento.cufd_evento )
            return null;
        const cufd = this.state.cufds.find( c => c.codigo == this.state.evento.cufd_evento );
        return cufd;
    }
    sucursalChanged(evt)
    {
        //console.log(evt.target.value);
        this.state.evento.sucursal_id = evt.target.value == '' ? '' : Number(evt.target.value);
        this.getCufds();
    }
    puntoventaChanged(evt)
    {
        //console.log(evt.target.value);
        this.state.evento.puntoventa_id = evt.target.value == '' ? '' : Number(evt.target.value);
        this.getCufds();
    }
    tipoEventoChanged(evt)
    {
        this.state.evento.evento_id = Number(evt.target.value);
        console.log(evt.target.value, this.state.evento);
        this.state.esContingencia = this.state.evento.evento_id > 4;
        console.log(this.state.esContingencia);
    }
    cufdChanged(evt)
    {
        this.state.evento.cufd_evento = evt.target.value;
        if( this.state.evento.cufd_evento )
        {
            const cufd = this.cufdEvento;
            const fecha_creacion = deserializeDateTime(cufd.creation_date);
            const fecha_vigencia = deserializeDateTime(cufd.fecha_vigencia);
            this.eventoFechaInicio.el.value = fecha_creacion.toFormat('yyyy-MM-dd');
            this.eventoHoraInicio.el.value = fecha_creacion.toFormat('HH:mm');
            this.eventoFechaFin.el.value = fecha_vigencia.toFormat('yyyy-MM-dd');
            this.eventoHoraFin.el.value = fecha_vigencia.toFormat('HH:mm');
            return true;
        }

    }
    async getCufds()
    {
        console.log(this.state.evento);
        if( this.state.evento.sucursal_id === '' )
            return false;
        if( this.state.evento.puntoventa_id === '' )
            return false;
        const res = await this.model.getAllCufds(this.state.evento.sucursal_id, this.state.evento.puntoventa_id);
        this.state.cufds = res.data || [];
    }
    guardar()
    {

        try
        {
            this.state.evento.fecha_inicio = `${this.eventoFechaInicio.el.value} ${this.eventoHoraInicio.el.value}`;
            this.state.evento.fecha_fin = `${this.eventoFechaFin.el.value} ${this.eventoHoraFin.el.value}`;
            if( this.state.evento.sucursal_id == '' )
                throw new Error('Debe seleccionar una sucursal');
            if( this.state.evento.puntoventa_id == '' )
                throw new Error('Debe seleccionar un punto de venta');
            if( this.state.evento.evento_id <= 0 )
                throw new Error('Debe seleccionar un tipo de evento');
            if( this.state.evento.fecha_inicio == '' )
                throw new Error('Debe seleccionar una fecha de inicio');
            if( this.state.evento.evento_id > 4 && !this.state.evento.fecha_fin )
                throw new Error('Debe seleccionar una fecha de finalizacion');
            console.log(this.state.evento);
            if( this.props.onSubmit )
                this.props.onSubmit(this.state.evento);
        }
        catch(e)
        {
            this.dialogService.add(AlertDialog, {
                title: 'Error en la creacion del Evento/Contingencia',
                body: e.error || e.message || 'Ocurrio un error desconocido al crear el evento/contingencia.'
            });
        }
    }
}