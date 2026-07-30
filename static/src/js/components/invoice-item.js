/** @odoo-module **/

const {Component, useState, useRef} = owl;
const {onWillStart, onMounted} = owl.hooks;
import { useService } from "@web/core/utils/hooks";
import { ModalVoid } from '../modals/modal-void';
import { AlertDialog, ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";

export class SiatInvoiceItem extends Component
{
    static template = 'siat_client.invoice_item';
    static props = {
        motivosAnulacion: {type: Array, optional: false},
        invoice: {type: Object, optional: false},
        model: {type: Object, optional: false},
        getSector: Function,
    };
    static components = {};

    setup()
    {
        this.dialogService = useService('dialog');
        this.modalVoid = null;
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
        this.modalVoid = this.dialogService.add(ModalVoid, {
            title: 'Anulacion de Factura',
            invoice: this.props.invoice,
            motivos: this.props.motivosAnulacion,
            onCompleted: () => {},
            onVoid: (data) => this.anular(data),
        });
        console.log('modal void res', this.modalVoid);
    }
    async anular(data)
    {
        try
        {
            const res = await this.props.model.anular(data.invoice_id, data.motivo_id);
            this.props.invoice.status = res.data.status;
            this.dialogService.add(AlertDialog, {
                title: 'Anulacion Completada',
                body: 'La factura fue anulada correctamente.'
            });
        }
        catch(e)
        {
            this.dialogService.add(AlertDialog, {
                title: 'Error de Anulacion',
                body: e.error || e.message || 'Error desconocido al anular el documento'
            });
        }
    }
    async revertir()
    {
        try
        {
            if( !confirm('Esta seguro de revertir la factura?') )
                return false;
            const res = await this.props.model.revertir(this.props.invoice_id);
            this.props.invoice.status = res.data.status;
            this.dialogService.add(AlertDialog, {
                title: 'Reversion Completada',
                body: 'La factura fue revertida correctamente.'
            });
        }
        catch(e)
        {
            this.dialogService.add(AlertDialog, {
                title: 'Error de Anulacion',
                body: e.error || e.message || 'Error desconocido al anular el documento'
            });
        }
    }
}