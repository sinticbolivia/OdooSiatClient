/** @odoo-module **/
import {Component, onMounted, onWillStart, xml, useState} from '@odoo/owl';
import {useService} from '@web/core/utils/hooks';

export class SiatSyncCodigos extends Component
{
    static template = 'siat_client.sync_codigos';
    static props = {
        title: {type: String, optional: true},
        sucursal: {type: Number, optional: false},
        puntoventa: {type: Number, optional: false},
        model: {type: Object, optional: false},
    };

    setup()
    {
        this.state = useState({
            cuis: {
                codigo: '',
                fechaVigencia: '',
            },
            cufd: {
                codigo: '',
                codigoControl: '',
                direccion: '',
                fechaVigencia: '',
            },
        });
        onMounted( () => {
            console.log('SiatSyncCodigos.onMounted');
            this.obtenerCuis();
            this.obtenerCufd();
        });

    }
    async obtenerCuis()
    {
        const res = await this.props.model.getCuis(this.props.sucursal, this.props.puntoventa);
        console.log(res);
        Object.assign(this.state.cuis, res.data);
    }
    async obtenerCufd()
    {
        const res = await this.props.model.getCufd(this.props.sucursal, this.props.puntoventa);
        Object.assign(this.state.cufd, res.data);
    }
}