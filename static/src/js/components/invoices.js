/** @odoo-module **/

import {Component, onWillStart, onMounted, useState, useRef} from '@odoo/owl';
import {useService} from '@web/core/utils/hooks';
import {SiatInvoiceItem} from './invoice-item';
import { SiatModel } from '../siat_model';

export class SiatInvoices extends Component
{
    static template = 'siat_client.invoices';
    static props = {
        //model: {type: Object, optional: false},
    };
    static components = {SiatInvoiceItem};

    setup()
    {
        this.orm = useService("orm");
        this.page = 1;

        this.model = new SiatModel(this.orm);
        this.state = useState({
            motivosAnulacion: [],
            items: [],
        });
        onWillStart(async () => {
            this.getMotivosAnulacion();
            this.getItems();
        });
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
}