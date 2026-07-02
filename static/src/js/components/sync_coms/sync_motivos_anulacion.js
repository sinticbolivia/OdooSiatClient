/** @odoo-module **/
import {Component, onWillStart, onMounted, useState} from '@odoo/owl';

export class SiatSyncMotivosAnulacion extends Component
{
    static template = 'siat_client.sync_motivos_anulacion';
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
        onWillStart( () => {
            this.getData();
        });
    }
    async getData()
    {
        const res = await this.props.model.getMotivosAnulacion();
        this.state.lista = res.data.RespuestaListaParametricas.listaCodigos || [];
    }
}