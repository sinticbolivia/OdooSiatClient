/** @odoo-module **/
import {Component, onWillStart, onMounted, useState, useRef} from '@odoo/owl';
import {useService} from '@web/core/utils/hooks';
import {SiatModel} from '../siat_model';

export class SiatInvoicerSearchProduct extends Component
{
    static template = 'siat_client.invoicer-search-customer';
    static props = {
        invoice: {type: Object, optional: false},
        onProductAdded: Function,
    };
    static components = {};

    setup()
    {
        this.orm = useService('orm');
        this.model = new SiatModel(this.orm);
        this.searchTimeout = null;
        this.state = useState({
            products_list: [],
            keyword: '',
        });
    }
    handleKeydown(ev)
    {
        if( ev.keyCode == 13 )
        {
            ev.preventDefault();
            return false;
        }
    }
    handleKeyup(ev)
    {
        if(ev.keyCode == 13 )
        {
            this.addItem();
            return true;
        }
        this.buscarProducto(ev);
    }
    async buscarProducto(evt)
    {
        if( this.searchTimeout )
            clearTimeout(this.searchTimeout);
        let keyword = this.state.keyword;
        if( keyword.trim().length <= 0  || evt.keyCode == 27 )
        {
            this.state.products_list = [];
            return;
        }
        this.searchTimeout = setTimeout(async () =>
        {
            try
            {
                const res = await this.model.buscarProducto(keyword);
                console.log('buscarProducto', res);
                this.state.products_list = res;

            }
            catch(e)
            {
                console.error(e);
            }
        }, 500);

    }
    addItem(prod, e)
    {
        e ? e.preventDefault() : null;
        if( this.state.keyword.trim().length <= 0 )
            return false;

        let item_name = this.state.keyword;
        /*
        if( this.itemfound )
        {
            item_name = this.itemfound;
        }
        */
        let found = this.props.invoice.items.find( _item => prod && _item.id == prod.id);
        if( typeof(found) != 'undefined' )
        {
            found.quantity++;
            found.total = (found.price * found.quantity) - found.discount;
        }
        else
        {
            this.props.invoice.items.push(
                {
                    item_id: 0,
                    invoice_id: 0,
                    product_id: prod ? prod.id : 0,
                    product_code: prod ? prod.code : '',
                    product_name: prod ? prod.name : item_name,
                    price: prod ? prod.list_price : 0,
                    quantity: 1,
                    total: prod ? prod.list_price : 0,
                    numero_serie: '', //prod ? prod.numserie : '',
                    numero_imei: '', //prod ? prod.imei : '',
                    unidad_medida: prod ? prod.unidad_medida : 58,
                    codigo_producto_sin: prod ? prod.codigo_producto_sin : '',
                    codigo_actividad: prod ? prod.actividad_economica : '',
                    discount: 0,
                    data: {custom_fields: {}}
                }
            );
        }

        this.state.keyword = '';
        this.state.products_list = [];
        this.props.onProductAdded();
    }
    selectProduct(item, index, evt)
    {
        this.addItem(item, evt);
        this.state.products_list = [];
    }
}