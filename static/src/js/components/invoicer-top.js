/** @odoo-module **/
import {Component, onWillStart, onMounted, useState, useRef} from '@odoo/owl';
import {useService} from '@web/core/utils/hooks';
import {SiatModel} from '../siat_model';

export class SiatInvoicerTop extends Component
{
    static template = 'siat_client.invoicer-top';
    static props = {
        puntosventa: Array,
        monedas: Array,
        invoice: {type: Object, optional: false},
        activeEvent: {/*type: Object, optional: false*/},
        //onEventoActivo: Function,
        onOpsClicked: Function,
    };
    static components = {};

    setup()
    {
        this.quickEvents = [
            {id: 1, label: 'CORTE DEL SERVICIO DE INTERNET'},
            {id: 2, label: 'INACCESIBILIDAD AL SERVICIO WEB DE LA ADMINISTRACIÓN TRIBUTARIA'},
            {id: 3, label: 'INGRESO A ZONAS SIN INTERNET POR DESPLIEGUE DE PUNTO DE VENTA EN VEHICULOS AUTOMOTORES'},
            {id: 4, label: 'VENTA EN LUGARES SIN INTERNET'},
        ];
        this.orm = useService('orm');
        this.model = new SiatModel(this.orm);
        this.state = useState({
            //activeEvent: {evento_id: 0},
        });
    }
    openEvent(event)
    {

    }
    opsClicked()
    {
        if( !this.props.onOpsClicked )
            return false;
        this.props.onOpsClicked();
    }
    cerrarEvento()
    {
    }
}