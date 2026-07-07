/** @odoo-module **/

import { Component, useState } from '@odoo/owl';
import { useService } from "@web/core/utils/hooks";
import { Dialog } from "@web/core/dialog/dialog";
import { AlertDialog, ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";

export class SiatModalPrint extends Component
{
    static template = 'siat_client.modal-print-invoice';
    static components = { Dialog };
    static props = {
        close: {type: Function,},
        title: {type: String, optional: false},
        invoice: {type: Object, optional: false},
    };
    setup()
    {
        this.data = useState(this.env.dialogData);
    }
    get print_url_ticket()
    {
        return this.props.invoice.print_url + '?tpl=rollo';
    }
    get print_url_receipt()
    {
        return this.props.invoice.print_url + '?tpl=minimal';
    }
}