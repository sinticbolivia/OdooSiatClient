odoo.define('siat_client.SiatPaymentDataScreen', function (require) {
    'use strict';

    const { useState, onMounted, onWillStart } = owl.hooks;
    const { useService } = require("@web/core/utils/hooks");
    const { parse } = require('web.field_utils');
    const PosComponent = require('point_of_sale.PosComponent');
    const { useErrorHandlers, useAsyncLockedMethod } = require('point_of_sale.custom_hooks');
    const NumberBuffer = require('point_of_sale.NumberBuffer');
    const { useListener } = require('web.custom_hooks');
    const Registries = require('point_of_sale.Registries');
    const { onChangeOrder } = require('point_of_sale.custom_hooks');
    const { isConnectionError } = require('point_of_sale.utils');
    const { SiatModel } = require('@siat_client/js/siat_model');

    class SiatPaymentDataScreen extends PosComponent
    {
        static template = 'SiatPaymentDataScreen';

        constructor() {
            super(...arguments);
            console.log('SiatPaymentDataScreen', this.env);
        }
        setup()
        {
            console.log('SiatPaymentDataScreen.setup');
            //this.orm = this.env.services.orm;//useService('orm');
            //this.model = new SiatModel(this.orm);
            this.state = useState({
                paymentMethods: [],
                documentTypes: [],
            });
            this.getPaymentMethods();
            this.getDocumentTypes();
        }
        mounted()
        {
            //this.env.pos.on('change:selectedClient', this.render, this);

        }
        willUnmount()
        {
            //this.env.pos.off('change:selectedClient', null, this);
        }
        async getPaymentMethods()
        {
            const res = await this.env.services.rpc({
                model: 'siat_client.sync',
                method: 'get_metodos_pago',
                args: [[], []]
            });
            this.state.paymentMethods = res.data.RespuestaListaParametricas.listaCodigos || [];
        }
        async getDocumentTypes()
        {
            const res = await this.env.services.rpc({
                model: 'siat_client.sync',
                method: 'get_documentos_identidad',
                args: [[], []]
            });
            this.state.documentTypes = res.data.RespuestaListaParametricas.listaCodigos || [];
        }
    }
    Registries.Component.add(SiatPaymentDataScreen);

    return SiatPaymentDataScreen;
});