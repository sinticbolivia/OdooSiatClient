/** @odoo-module **/

import {Component, onMounted, onWillStart, xml, useState, markup, useRef} from '@odoo/owl';
import {useService} from '@web/core/utils/hooks';
import {SiatSyncCodigos} from './sync_coms/sync_codigos';
import {SiatSyncActividades} from './sync_coms/sync_actividades';
import {SiatSyncLeyendas} from './sync_coms/sync_leyendas';
import {SiatSyncMotivosAnulacion} from './sync_coms/sync_motivos_anulacion';
import {SiatSyncProductos} from './sync_coms/sync_productos';
import {SiatSyncUnidadesMedida} from './sync_coms/sync_unidades_medida';
import {SiatSyncMetodosPago} from './sync_coms/sync_metodos_pago';
import {SiatSyncDocumentosSector} from './sync_coms/sync_documentos_sector';
import {SiatSyncDocumentosIdentidad} from './sync_coms/sync_documentos_identidad';
import {SiatSyncMonedas} from './sync_coms/sync_monedas';
import {SiatSyncActividadesDocumentosSector} from './sync_coms/sync_actividades_documentos_sector';
import {SiatSyncTiposHabitacion} from './sync_coms/sync_tipos_habitacion';
import { SiatModel } from '../siat_model';

export class SiatSync extends Component
{
    static template = 'siat_client.sync';
    static props = {};
    static components = {SiatSyncCodigos, SiatSyncActividades};

    setup()
    {
        //console.log('SiatSync', SiatSyncCodigos);
        this.menus = [
            {id: 1, label: 'Codigos', com: SiatSyncCodigos},
            {id: 2, label: 'Actividades', com: SiatSyncActividades},
            {id: 3, label: 'Actividades Documento Sector', com: SiatSyncActividadesDocumentosSector},
            {id: 4, label: 'Leyendas Factura', 	com: SiatSyncLeyendas},
            {id: 5, label: 'Tipos Habitacion', com: SiatSyncTiposHabitacion},
            {id: 6, label: 'Productos Servicios', com: SiatSyncProductos},
            {id: 7, label: 'Eventos Significativos', com: null},
            {id: 8, label: 'Motivos Anulacion', com: SiatSyncMotivosAnulacion},
            {id: 9, label: 'Tipos Documento Identidad', com: SiatSyncDocumentosIdentidad},
            {id: 10, label: 'Tipos Documento Sector', com: SiatSyncDocumentosSector},
            {id: 11, label: 'Tipos Emision', com: null},
            {id: 12, label: 'Tipos Metodo de Pago', com: SiatSyncMetodosPago},
            {id: 13, label: 'Tipos Moneda', com: SiatSyncMonedas},
            {id: 14, label: 'Tipos Punto Venta', com: null},
            {id: 15, label: 'Tipos Factura', com: null},
            {id: 16, label: 'Unidades de Medida', com: SiatSyncUnidadesMedida},
        ];
        this.orm = useService("orm");
        this.com = null;//{id: null, com: null};
        this.com_props = {};
        this.model = new SiatModel(this.orm);
        this.state = useState({
            com: null, //this.menus[0], //{id: null, com: null},
            com_props: {},
            priv_sucursal_id: '0',
            priv_puntoventa_id: '0',
            sucursales: [],
            puntos_venta: [],
        });
        onWillStart( async () => {
            await this.getBranches();
            await this.getPuntosVenta();
            console.log('onWillStart', this.com);

        });
        onMounted( () => {
            console.log('onMounted', this.com);
            //this.com = this.menus[0];
            this.showComponent(this.menus[0]);
        });
    }
    /*
    get com_current()
    {
        //const cmod = this.com && this.com.com ? this.com.com : null;
        const cmod = this.state.com && this.state.com.com ? this.state.com.com : null;
        console.log('com_current', cmod);
        //this.state.com = cmod;
        return cmod;
    }
    get com_args()
    {
        this.state.com_props = {
            sucursal: parseInt(this.state.priv_sucursal_id),
            puntoventa: parseInt(this.state.priv_puntoventa_id),
        };
        console.log('com_args', this.state.com_props);
        return this.state.com_props;
    }
    */
    showComponent(menuItem)
    {
        console.log('SiatSync.showComponent', menuItem);
        if( !menuItem.com )
            return false;
        this.state.com_props = {
            title: menuItem.label,
            sucursal: parseInt(this.state.priv_sucursal_id),
            puntoventa: parseInt(this.state.priv_puntoventa_id),
            model: this.model,
        };
        this.state.com = menuItem;
    }
    async getBranches()
    {
        //const res = await this.service.obtenerSucursales();
        //this.sucursales = res.data;
    }
    async getPuntosVenta()
    {
        try
        {
            //const res = await this.service.obtenerPuntosVenta();
            //this.puntos_venta = res.data;
        }
        catch(e)
        {
            console.error(e);
        }
    }
}