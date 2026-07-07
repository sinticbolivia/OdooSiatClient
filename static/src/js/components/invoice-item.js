/** @odoo-module **/

import {Component, onWillStart, onMounted, useState, useRef} from '@odoo/owl';
import { useService } from "@web/core/utils/hooks";
import {ModalVoid} from '../modals/modal-void';

export class SiatInvoiceItem extends Component
{
    static template = 'siat_client.invoice_item';
    static props = {
        motivosAnulacion: {type: Array, optional: false},
        invoice: {type: Object, optional: false},
        getSector: Function,
    };
    static components = {};

    setup()
    {
        this.dialogService = useService('dialog');
    }
    get documentoSector()
    {
        const code = this.props.invoice.codigo_documento_sector;
        return this.props.getSector(code);
    }
    getStatus()
    {
        const statuses = {
            'issued': 'Emitida',
            'error': 'Error',
            'void': 'Anulada',
        };
        return statuses[this.props.invoice.status] || 'Desconocido';
    }
    viewUrl(tpl)
    {
        return this.props.invoice.print_url + (tpl ? `?tpl=${tpl}` : '');
    }
    openVoid()
    {
        const res = this.dialogService.add(ModalVoid, {
            title: 'Anulacion de Factura',
            invoice: this.props.invoice,
            motivos: this.props.motivosAnulacion,
            onCompleted: () => {},
            onVoid: (data) => this.anular(data),
        });
        console.log('modal void res', res);
    }
    async anular(data)
    {
        console.log('InvoiceItem.anular');
        try
        {
            const res = await this.model.anular(data.invoice_id, data.motivo_id);
            //return this.data.close();
        }
        catch(e)
        {
            this.dialogService.add(AlertDialog, {
                title: 'Errode Anulacion',
                body: e.error || e.message || 'Error desconocido al anular el documento'
            });
        }
    }
    async revertir()
    {
    }
}