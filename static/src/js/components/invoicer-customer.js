/** @odoo-module **/
import {Component, onWillStart, onMounted, useState, useRef, onWillUpdateProps, onPatched} from '@odoo/owl';
import {useService} from '@web/core/utils/hooks';
import {SiatModelCustomers} from '../siat_model_customers';
import {SiatModalCustomerForm} from '../modals/modal-customer-form';

export class SiatInvoicerCustomer extends Component
{
    static template = 'siat_client.invoicer-customer';
    static props = {
        invoice: {type: Object, optional: false},
        tipos_documentos: {type: Array, optional: false,},
        onCustomerSelected: Function,
    };

    setup()
    {
        this.dialogService = useService('dialog');
        this.orm = useService('orm');
        this.model = new SiatModelCustomers(this.orm);
        this.searchTimeout = null;
        this.currentCustomer = null;
        this.state = useState({
            keyword_customer: '',
            keyword_nit: '',
            customers_list: [],
        });

        onWillUpdateProps((newProps) => {
            // Logic to run before state updates
            console.log("State or props will change:", newProps);
        });

        onPatched(() => {
            // Logic to run after the DOM has updated
            console.log("Component DOM has been patched", arguments);
        });
    }
    async buscarCliente(by, evt)
    {
        //console.log(evt.keyCode);
        if( this.searchTimeout )
            clearTimeout(this.searchTimeout);
        let keyword = '';
        if( by == 'customer' )
            keyword = this.state.keyword_customer;
        else
            keyword = this.state.keyword_nit;
        if( keyword.trim().length <= 0 || evt.keyCode == 27 ) //keyCode for Escape
        {
            this.state.customers_list = [];
            return;
        }
        this.searchTimeout = setTimeout(async () =>
        {
            try
            {
                const res = await this.model.search(keyword);
                //console.log('customers result', res);
                this.state.customers_list = res || [];
            }
            catch(e)
            {
                console.error(e);
            }
        }, 500);
    }
    crearCliente()
    {
        this.dialogService.add(SiatModalCustomerForm, {
            title: 'Crear Cliente',
            onCustomerCreated: (customer) => {
            }
        });
    }
    selectCustomer(item, index)
    {
        this.currentCustomer 	= item;
        if( item.first_name || item.firstname )
            this.state.keyword_customer = item.first_name || item.firstname;
        if( item.last_name )
            this.state.keyword_customer = item.first_name ? ` ${item.last_name}` : item.last_name;
        if( item.lastname )
            this.state.keyword_customer = item.firstname ? ` ${item.lastname}` : item.lastname;
        this.state.keyword_nit 		= item.tax_number || item.nit_ruc_nif; //item.meta && item.meta._nit_ruc_nif ? item.meta._nit_ruc_nif : '';
        this.state.customers_list 	= [];
        if( this.props.onCustomerSelected )
            this.props.onCustomerSelected(item, this.state.keyword_nit);
    }
    controlTributario(val)
    {
        if( val == 'control_tributario' )
        {
            this.state.keyword_customer = 'Control Tributario';
            this.state.keyword_nit = 99002;
        }
        else if( val == 'ventas_menores' )
        {
            this.state.keyword_customer = 'Ventas Menores del Dia';
            this.state.keyword_nit = 99003;
        }
        else if( val == 'caso_especial' )
        {
            this.state.keyword_customer = '';
            this.state.keyword_nit = 99001;
        }
        else
        {
            this.state.keyword_customer = '';
            this.state.keyword_nit = '';
        }
    }
}