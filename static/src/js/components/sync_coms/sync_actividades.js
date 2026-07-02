/** @odoo-module **/
import {Component, onMount, onWillStart, xml, useState} from '@odoo/owl';
import {useService} from '@web/core/utils/hooks';

export class SiatSyncActividades extends Component
{
    static template = 'siat_client.sync_actividades';
    static props = {
        title: {type: String, optional: true},
        sucursal: {type: Number, optional: false},
        puntoventa: {type: Number, optional: false},
        model: {type: Object, optional: false},
    };

    setup()
    {
        this.state = useState({
            lista: [],
        });
        onWillStart( async () => {
            this.getData();
        });
    }
    async getData()
    {
        const res = await this.props.model.getActividades(this.props.sucursal, this.props.puntoventa);
        this.state.lista = Array.isArray(res.data.RespuestaListaActividades.listaActividades) ?
            res.data.RespuestaListaActividades.listaActividades :
            [res.data.RespuestaListaActividades.listaActividades];
    }
}