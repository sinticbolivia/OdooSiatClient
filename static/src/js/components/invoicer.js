/** @odoo-module **/
import {Component, onWillStart, onMounted, useState, useRef} from '@odoo/owl';
import { AlertDialog, ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";
import {useService} from '@web/core/utils/hooks';
import {SiatInvoicerTop} from './invoicer-top';
import {SiatInvoicerCustomer} from './invoicer-customer';
import {SiatInvoicerSearchProduct} from './invoicer-search-product';
import {SiatModel} from '../siat_model';
import {SiatInvoicerModalOptions} from '../modals/modal-ops';
import SectoresSettings from './sectores/settings';

export class SiatInvoicer extends Component
{
    static template = 'siat_client.invoicer';
    static props = {};
    static components = {SiatInvoicerTop, SiatInvoicerCustomer, SiatInvoicerSearchProduct};

    setup()
    {
        this.orm = useService('orm');
        this.dialogService = useService('dialog');
        this.model = new SiatModel(this.orm);
        this.forminvoice = useRef('forminvoice');

        this.state = useState({
            puntosventa: [],
            monedas: [],
            tipos_documentos: [],
            unidadesMedida: [],
            sinProducts: [],
            lista_actividades: [],
            metodos_pago: [],
            sectores: [],
            activeEvent: null,
            scom_detalle: null,
            scom_detalle_props: {},
            scom_item: null,
            scom_item_props: {},
            item_edit: -1,
            activeEvent: null,
            with_giftcard: true,
            com_sector_totals: null,
            com_sector_totals_props: {},
            invoice: {
                codigo_documento_sector: 1, //Compra Venta
                codigo_moneda: 1, //Boliviano
                tipo_cambio: 1,
                customer_id: null,
                customer: '',
                nit_ruc_nif: '',
                complemento: '',
                tipo_documento_identidad: '',
                codigo_sucursal: 0,
                punto_venta: 0,
                codigo_metodo_pago: 1, //Efectivo
                numero_tarjeta: null,
                discount: 0,
                monto_giftcard: 0,
                subtotal: 0,
                total_tax: 0,
                total: 0,
                items: [],
                data: {
                    custom_fields: {},
                },
            },
        });
        onWillStart( () => {
            this.getParameters();
        });
    }
    async getParameters()
    {
        try
        {
            //await Promise.all([]);
            let res = await this.model.getPuntosVenta();
            this.state.puntosventa = res.data || [];
            res = await this.model.getDocumentosIdentidad();
            this.state.tipos_documentos = res.data.RespuestaListaParametricas.listaCodigos;
            res = await this.model.getMonedas();
            this.state.monedas = res.data.RespuestaListaParametricas.listaCodigos;
            res = await this.model.getMetodosPago();
            this.state.metodos_pago = res.data.RespuestaListaParametricas.listaCodigos;
            res = await this.model.getUserSectores();
            this.state.sectores = res.data || {};
            const entries = Object.entries(this.state.sectores);
            //console.log('entries', entries);
            if( entries.length > 0 )
            {
                const found = entries.find( item => item[1].code == 1);
                if( !found )
                {
                    const first_sector = entries[0];
                    //console.log('first_sector', first_sector);
                    this.state.invoice.codigo_documento_sector = first_sector[1].code;
                    this.prepareSector(Object.assign({code_str: first_sector[0]}, first_sector[1]));
                }
            }
            console.log(res.data);
        }
        catch(e)
        {
            console.error('GET PARAMETERS ERROR', e);
        }
    }
    showOps()
    {
        const res = this.dialogService.add(SiatInvoicerModalOptions, {
            title: 'Opciones de Facturacion',
            invoice: this.state.invoice,
            sucursales: [],
            sectores: Object.entries(this.state.sectores),
            onSectorChanged: (sector_code) => {
                //console.log(this.state.sectores[sector_code]);
                this.prepareSector({code_str: sector_code, ...this.state.sectores[sector_code]});
            },
        });
    }
    prepareSector(sector)
    {
        //console.log(sector, SectoresSettings);
        const component_item = SectoresSettings.components[sector.code_str + '_item'];
        const component_detalle = SectoresSettings.components[sector.code_str + '_detalle'];
        const component_totals = SectoresSettings.components[sector.code_str + '_totals'];
        //if( component_item )
        {
            this.state.scom_item_props = {invoice: this.state.invoice};
            this.state.scom_item = component_item || null;
        }
        //if( component_detalle )
        {
            this.state.scom_detalle_props = {invoice: this.state.invoice};
            this.state.scom_detalle = component_detalle || null;
        }
        //if( component_totals )
        {
            this.state.com_sector_totals_props = {invoice: this.state.invoice};
            this.state.com_sector_totals = component_totals || null;
        }
    }
    onActiveEvent()
    {
    }
    onCustomerSelected(customer, nit)
    {
        this.state.invoice.customer_id = customer.id;
        this.state.invoice.customer = `${customer.firstname} ${customer.lastname}`.trim();
        this.state.invoice.nit_ruc_nif = nit;
    }
    calculateTotals()
    {
        let total = 0;
        for(let item of this.state.invoice.items)
        {
            total += item.total;
        }
        this.state.invoice.subtotal = total;
        this.state.invoice.total = this.state.invoice.subtotal - this.state.invoice.discount - this.state.invoice.monto_giftcard;
        if( [6, 8, 28].indexOf(this.state.invoice.codigo_documento_sector) == -1 )
            this.state.invoice.total_tax = this.state.invoice.total * 0.13;
        else
            this.state.invoice.total_tax = 0;
    }
    editItem(index)
    {
        this.state.item_edit = index;
    }
    saveItem(index)
    {
        this.state.item_edit = -1;
    }
    removeItem(index)
    {
        this.state.invoice.items.splice(index, 1);
        this.calculateTotals();
    }
    async save()
    {
        //this.$refs.forminvoice.classList.remove('was-validated');
        //this.$refs.formtarjeta.classList.remove('was-validated');
        try
        {
            if( !this.forminvoice.el.checkValidity() )
            {
                this.forminvoice.el.classList.add('was-validated');
                return;
            }
            if( this.state.invoice.customer_id <= 0 )
                throw {error: 'Debe seleccionar un cliente para la factura'};
            if( !this.state.invoice.customer )
                throw {error: 'Debe seleccionar un nombre de cliente para la factura'};
            if( this.state.invoice.items.length <= 0 )
                throw {error: 'Debe adicionar almenos un item a la factura'};

            if( this.activeEvent && [5, 6, 7].indexOf( parseInt(this.activeEvent.evento_id) ) != -1)
            {
                if( !this.$refs.fecha )
                    throw {error: 'Debe seleccionar la fecha de la factura'};
                if( !this.$refs.hora )
                    throw {error: 'Debe seleccionar la hora de la factura'};
                if( !this.invoice.data.nro_factura )
                    throw {error: 'Debe ingresar el numero de factura'};

                this.invoice.invoice_date_time = new Date(`${this.$refs.fecha.value} ${ this.$refs.hora.value}`);
                //this.evento.fecha_inicio.setSeconds((new Date()).getSeconds());
            }

            if( [6, 16].indexOf(this.state.invoice.codigo_documento_sector) != -1 )
            {
                //this.state.invoice.data.custom_fields['fechaIngresoHospedaje'] = this.$refs.headercom.getFechaHoraIngreso();
            }
            const metodo_pago = this.state.metodos_pago.find( item => item.codigoClasificador == this.state.invoice.codigo_metodo_pago);
            if( !metodo_pago )
                throw {error: 'Debe seleccionar el metodo de pago'};
            if( metodo_pago.descripcion.toUpperCase().indexOf( 'TARJETA' ) != -1 )
            {
                /*
                this.state.invoice.numero_tarjeta = this.$refs.inputcard.dataset.realvalue || null;
                this.$refs.formtarjeta.classList.add('was-validated');
                if( !this.state.invoice.numero_tarjeta )
                {
                    this.openModal(this.modalDatosTarjeta);
                    return;
                }
                if( !this.$refs.formtarjeta.checkValidity() )
                {
                    this.openModal(this.modalDatosTarjeta);
                    throw {error: 'Datos de tarjeta invalidos'};
                }
                */
            }
            //this.state.invoice.customer_id 			= this.currentCustomer.id;
            //this.invoice.customer				= this.keyword_customer;
            //this.invoice.customer 				= this.currentCustomer.name; //`${this.currentCustomer.first_name} ${this.currentCustomer.last_name}`;
            //this.state.invoice.nit_ruc_nif 			= this.keyword_nit;
            console.log(this.state.invoice);
            const res = await this.model.crearFactura(this.state.invoice);
            console.log('RESPONSE', res);
            if( res && res.data && res.data.id )
            {
                //this.generatedInvoice = res.data;
                //this.openModal(this.modalImprimir);
                /*
                this.dialogService.add(AlertDialog, {
                    title: 'Nota de Credito/Debito',
                    body: 'La Nota de Credito/Debito fue generada correctamente',
                    confirmLabel: 'Imprimir',
                    confirm: () => {
                        //alert('Print');
                        window.open(this.state.print_url, '_blank');
                        this.reset();
                    },
                    cancel: () => {
                        this.reset();
                    },
                    cancelLabel: 'Cerrar',
                });
                */
            }
            this.state.activeEvent = null;
            //await this.checkActiveEvent(this.invoice.codigo_sucursal, this.invoice.punto_venta);
            this.reset();
        }
        catch(e)
        {
            console.error('RESPONSE ERROR', e, e.data);
            //this.$root.$processing.hide();
            if( e.response == 'error_nit' )
            {
                alert('NIT invalido');
                return true;
            }
            this.dialogService.add(AlertDialog, {
                title: 'Error al crear la Factura',
                body: e.data.message || 'Error deconocido al crar la factura, intente nuevamente',
                confirmLabel: 'Cerrar',
                confirm: () => {
                },
                //cancelLabel: 'Cerrar',
            });
        }
    }
    reset()
    {
        const pv = this.state.invoice.punto_venta;
        //this.state.invoice = 	new SBFramework.Models.Invoice();
        //this.state.invoice.codigo_documento_sector = null;
        //this.state.invoice.codigo_documento_sector = this.current_doc_sector;
        //this.state.invoice.punto_venta = pv;
        //this.currentCustomer = {id: 0, customer_id: 0};
        //this.$refs.inputcard.value = '';
        //this.$refs.inputcard.dataset.realvalue = '';
        //this.keyword_customer = '';
        //this.keyword_nit = '';
    }
}