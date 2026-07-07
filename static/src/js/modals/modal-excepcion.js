/** @odoo-module **/
import { Component, useState, useRef } from '@odoo/owl';
import { useService } from "@web/core/utils/hooks";
import { Dialog } from "@web/core/dialog/dialog";

class SiatModelExcepcion extends Component
{
    static template = 'siat_client.modal-excepcion';
    static props = {
        invoice: {type: Object, optional: false},
        onException: Function,
    };

    setup()
    {
        this.data = useState(this.env.dialogData);
    }
    submit()
    {

        //this.props.invoice.excepcion = 1;
        this.data.close();
        this.props.onException();
    }
}