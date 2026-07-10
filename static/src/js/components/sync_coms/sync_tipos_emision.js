/** @odoo-module **/
import {Component, onWillStart, onMounted, useState} from '@odoo/owl';

export class SiatSyncTiposEmision extends Component
{
    static template = 'siat_client.sync_parametricas';
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
        const res = await this.props.model.getTiposEmision();
        this.state.lista = res.data.RespuestaListaParametricas.listaCodigos || [];
    }
}