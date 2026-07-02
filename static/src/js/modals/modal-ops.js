/** @odoo-module **/

import { Component, useState, useRef } from '@odoo/owl';
import { useService } from "@web/core/utils/hooks";
import { Dialog } from "@web/core/dialog/dialog";
import { AlertDialog, ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";

export class SiatInvoicerModalOptions extends Component
{
    static template = 'siat_client.modal-ops';
    static components = { Dialog };
    static props = {
        close: {type: Function,},
        title: {type: String, optional: false},
        invoice: {type: Object, optional: false},
        sucursales: {type: Array, optional: false},
        sectores: {type: Array, optional: false},
        onSectorChanged: Function,
    };
    setup()
    {
        this.dialogService = useService('dialog');
        this.sectoresEl = useRef('sectoresEl');
        this.state = useState({

        });
        this.data = useState(this.env.dialogData);
        //console.log('dialogData', this.env.dialogData);
    }
    onSectorChanged()
    {
        console.log(this.sectoresEl.el);
        const index = this.sectoresEl.el.options.selectedIndex;
        const option = this.sectoresEl.el.options[index];
        if( !option || !option.dataset.code )
            return false;
        //console.log(option.dataset.code, this.props.sectores);
        this.props.onSectorChanged(option.dataset.code);
    }
}