/** @odoo-module **/
import {Component, onWillStart, onMounted, useState} from '@odoo/owl';

export class SiatSyncProductos extends Component
{
    static template = 'siat_client.sync_productos';
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
        const res = await this.props.model.getProductosServicios();
        this.state.lista = res.data.RespuestaListaProductos.listaCodigos || [];
    }
}