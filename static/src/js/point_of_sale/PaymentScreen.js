/** odoo-module **/
//import { patch } from "@web/core/utils/patch";
//import {PaymentScreen} from '@point_of_sale/PaymentScreen';
odoo.define('siat_client.PaymentScreen', function (require) {
    'use strict';
    const PaymentScreen = require('point_of_sale.PaymentScreen');
    const { patch } = require("web.utils");

    patch(PaymentScreen.prototype, 'siat_payment_data', {
        async _isOrderValid(isForceValidate) {
            const res = await this._super(isForceValidate);
            console.log('patch:siat_payment_data', 'super response', res);

            return res;
        },
        get nextScreen() {
            console.log('patch:siat_payment_data', 'nextScreen', this.error);
            return !this.error? 'ReceiptScreen' : 'ProductScreen';
        },
        onDatosFacturacionClicked(evt)
        {
            if( !this.env.siatData )
            {
                this.env.siatData = {
                    customer: this.currentOrder.attributes.client.name,
                    nit_ruc_nif: this.currentOrder.attributes.client.vat || '',
                    payment_method: '',
                    complement: '',
                    document_type: 1,
                };
            }

            console.log('currentOrder', this.currentOrder, this.env.siatData);
            this.showScreen('SiatPaymentDataScreen');
        }
    });
});
