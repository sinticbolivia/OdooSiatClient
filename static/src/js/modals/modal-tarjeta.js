/** @odoo-module **/

import { Component, useState, useRef } from '@odoo/owl';
import { useService } from "@web/core/utils/hooks";
import { Dialog } from "@web/core/dialog/dialog";
import { AlertDialog, ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";

export class SiatModalTarjeta extends Component
{
    static template = 'siat_client.modal-tarjeta';
    static components = { Dialog };
    static props = {
        close: {type: Function,},
        title: {type: String, optional: false},
        invoice: {type: Object, optional: false},
        onSubmit: Function,
    };
    setup()
    {
        this.data = useState(this.env.dialogData);
        this.inputCard = useRef('inputcard');
        this.form = useRef('formtarjeta');
        this.state = useState({
        });
    }
    handleKeydown(e)
    {
        if( e.keyCode == 8 )
            return true;
        if( e.target.dataset.realvalue && e.target.dataset.realvalue.length >= 16 /*|| this.readOnly*/ )
        {
            e.preventDefault();
            return false;
        }
        if( (e.keyCode >= 48 && e.keyCode <= 57 ) || e.keyCode == 8 )
            return true;
        e.preventDefault();
        return false;
    }
    handleKeyup(e)
    {
        if( typeof e.target.dataset.realvalue == 'undefined')
            e.target.dataset.realvalue = '';
        if( e.keyCode == 8 && e.target.dataset.realvalue )
        {
            e.target.dataset.realvalue = e.target.dataset.realvalue.substring(0, e.target.dataset.realvalue.length - 1);
            return true;
        }
        if( e.target.dataset.realvalue && e.target.dataset.realvalue.length >= 16 )
        {
            return false;
        }
        //console.log(e);
        if( !e.target.value || e.target.value.length <= 0 )
        {
            e.target.dataset.realvalue = '';
            return true;
        }

        //const lastChar = this.value.substr(-1);
        e.target.dataset.realvalue += e.target.value.substr(-1);
        e.target.value = '';

        for(let i in e.target.dataset.realvalue)
        {
            if( typeof i == 'undefined' || isNaN(i))
                continue;
            console.log('i -> ', i);
            if( i > 3 && i < 12 )
                e.target.value += '0';
            else
                e.target.value += e.target.dataset.realvalue[i];
        }
    }
    save()
    {
        this.form.el.classList.remove('was-validated');
        try
        {
            if( !this.form.el.checkValidity() )
            {
                this.form.el.classList.add('was-validated');
                return false;
            }
            this.data.close();
            this.props.onSubmit(this.inputCard.el.value);
        }
        catch(e)
        {
        }

    }
}