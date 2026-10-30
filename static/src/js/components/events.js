/** @odoo-module **/
import { Component, onMounted, onWillStart, useState, xml } from "@odoo/owl";
import {useService} from '@web/core/utils/hooks';
import { AlertDialog, ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";
import { SiatModel } from '../siat_model';
import { SiatModalEvento } from '../modals/modal-evento';
import { SiatComponent } from './siat-component';

export class SiatEvents extends SiatComponent
{
    static template = 'siat_client.events';
    static props = {};
    static components = {};

    setup()
    {
        super.setup();
        this.uiService = useService("ui");
        this.dialogService = useService('dialog');
        this.state = useState({
            sucursales: [],
            puntosventa: [],
            eventos: [],
            items: [],
            config: null,
            config_id: null,
        });
        onWillStart(async () => {
            await this.getConfigs();
            this.getTypes();
            this.getEvents();
        });
    }
    async getTypes()
    {
        const res = await this.model.getTiposEventos();
        this.state.eventos = res.data ? res.data.RespuestaListaParametricas.listaCodigos : [];
    }
    async getEvents()
    {
        const res = await this.model.getEvents();
        this.state.items = res.data || [];
    }
    nuevoEvento(evt)
    {
        console.log(evt);
        this.dialogService.add(SiatModalEvento, {
            title: 'Registrar nuevo evento/contingencia',
            sucursales: this.state.sucursales,
            puntosventa: this.state.puntosventa,
            eventos: this.state.eventos,
            cufds: []
        });
    }
    onConfigChanged(evt)
    {
        this.state.config = this.configurations.find( cfg => cfg.id == parseInt(evt.target.value) );
        this.model.config = this.state.config;
        this.getEvents();
    }
}