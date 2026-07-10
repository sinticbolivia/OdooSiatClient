/** @odoo-module **/

import { Component, useState, useRef } from '@odoo/owl';
import { useService } from "@web/core/utils/hooks";
import { Dialog } from "@web/core/dialog/dialog";
import { AlertDialog, ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";
import {SiatModelCustomers} from '../siat_model_customers';

export class SiatModalCustomerForm extends Component
{
    static template = 'siat_client.modal-customer';
    static components = { Dialog };
    static props = {
        close: {type: Function,},
        title: {type: String, optional: false},
        onCustomerCreated: Function,
    };

    setup()
    {
        this.orm = useService('orm');
        this.dialogService = useService('dialog');
        this.data = useState(this.env.dialogData);
        this.state = useState({
            customer: {
                id: null,
                firstname: '',
                lastname: '',
                vat: '',
                street: '',
                email: '',
                company_name: '',
            }
        });
        this.formcustomer = useRef('formcustomer');
        this.model = new SiatModelCustomers(this.orm);
    }
    async guardarCliente()
    {
        try
        {
            if( !this.formcustomer.el.checkValidity() )
            {
                this.formcustomer.el.classList.add('was-validated')
                return false;
            }
            if( !this.state.customer.company_name )
                this.state.customer.company_name = this.state.customer.lastname;
            this.state.customer.name = `${this.state.customer.firstname} ${this.state.customer.lastname}`.trim();
            const action = this.state.customer.id ? 'update' : 'create';
            const res = this.state.customer.id > 0 ?
                await this.model.update(this.state.customer) :
                await this.model.create(this.state.customer);

            this.data.close();
            this.props.onCustomerCreated(action, Object.assign({}, this.state.customer));
            this.resetCustomer();
        }
        catch(e)
        {
            this.dialogService.add(AlertDialog, {
                title: 'Error Creando Cliente',
                body: e.error || e.message || 'Ocurrio un error al crear el cliente',
                confirmLabel: 'Cerrar',
                confirm: () => {
                },
            });
        }
    }
    resetCustomer()
    {
        this.state.customer = {
            id: null,
            name: '',
            street: '',
            vat: '',
            firstname: '',
            lastname: '',
            email: '',
            company_name: '',
        };
    }
}