/** @odoo-module **/

const { Component, useState } = owl;
const {xml} = owl.tags;
import { useService } from "@web/core/utils/hooks";
import { Dialog } from "@web/core/dialog/dialog";
import { AlertDialog, ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";


export class ModalVoid extends Dialog//Component
{
    static bodyTemplate = 'siat_client.modal-void';
    static footerTemplate = xml`<div>
        <button class="btn btn-danger o-default-button" t-on-click="props.close()">
            <t>Cerrar</t>
        </button>
        <button type="button" class="btn btn-primary" t-on-click="onVoid">Anular</button>
    </div>`;
    static renderHeader = true;
    static renderFooter = true;
    static title = '';
    static components = { /*Dialog*/ };

    static props = {
        close: {type: Function,},
        title: {type: String, optional: false},
        invoice: {type: Object, optional: false},
        motivos: {type: Array, optional: false},
        onCompleted: Function,
        onVoid: Function,
    };
    setup()
    {
        super.setup();
        this.title = this.props.title;
        //console.log('motivos anulacion', this.props.motivos);
        this.dialogService = useService('dialog');
        this.state = useState({
            obj: {
                invoice_id: null,
                motivo_id: null,
            }
        });
        this.data = useState(this.env.dialogData);
        //console.log('dialogData', this.env.dialogData);
    }
    handleMotivo(evt)
    {
        this.state.obj.motivo_id = evt.target.value;
    }
    onVoid(evt)
    {
        try
        {
            this.state.obj.invoice_id = this.props.invoice.invoice_id;
            if( !this.state.obj.invoice_id )
                throw {error: 'Identificador de factura invalido'};
            if( !this.state.obj.motivo_id )
                throw {error: 'Debe seleccionar un motivo de anulacion para el documento'};
            this.props.onVoid(this.state.obj);
        }
        catch(e)
        {
            this.dialogService.add(AlertDialog, {
                title: 'Error de datos',
                body: e.error || e.message || 'Error desconocido al tratar de anular el documento'
            });
        }

    }
}