/** @odoo-module **/

import {Component, onWillStart, onMounted, useState, useRef} from '@odoo/owl';
import { Pager } from "@web/core/pager/pager";
import {useService} from '@web/core/utils/hooks';
import {SiatInvoiceItem} from './invoice-item';
import { SiatModel } from '../siat_model';

export class SiatInvoices extends Component
{
    static template = 'siat_client.invoices';
    static props = {
    };
    static components = {Pager, SiatInvoiceItem};

    async setup()
    {
        this.orm = useService("orm");
        this.page = 1;
        this.documentos_sector = [];
        this.model = new SiatModel(this.orm);

        this.state = useState({
            motivosAnulacion: [],
            items: [],
            offset: 0,
            limit: 25,
            total: 0,
        });
        onWillStart(async () => {
            const res = await this.model.getDocumentosSector();
            this.documentos_sector = res.data.RespuestaListaParametricas.listaCodigos;
            //console.log('documentos sector', this.documentos_sector);
            this.getMotivosAnulacion();
            this.getItems();

        });
    }
    getDocumentoSector(codigo)
    {
        console.log('getDocumentoSector', codigo);
        const found = this.documentos_sector.find( item => item.codigoClasificador == codigo);
        return found ? found.descripcion : codigo;
    }
    async getMotivosAnulacion()
    {
        const res = await this.model.getMotivosAnulacion();
        this.state.motivosAnulacion = res.data.RespuestaListaParametricas.listaCodigos || [];
    }
    async getItems()
    {
        const res = await this.model.getInvoices(this.page);
        this.state.items = res.data || [];
    }
    async onPagerUpdate(data)
    {
        const {offset, limit} = data;
        this.state.offset = offset;
        this.state.limit = limit;
        //await this.getItems();
    }
}