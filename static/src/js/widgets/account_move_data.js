/** @odoo-module **/
import { Component, useState, onWillStart } from "@odoo/owl";
import {useService} from '@web/core/utils/hooks';
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { registry } from "@web/core/registry";
import { SiatModel } from '../siat_model';

export class SiatAccountMoveData extends Component
{
    static template = 'siat_client.account-move-data';

    setup()
    {
        this.orm = useService('orm');
        this.model = new SiatModel(this.orm);
        this.state = useState({
            invoice: null,
        });
        onWillStart(() => {
            //console.log(standardFieldProps, 'props', this.props);
            this.getData();
        });
    }
    async getData()
    {
        console.log(`GET INVOICE DATA: ${this.props.record.data.invoice_siat_id}`);
        if( !this.props.record.data.invoice_siat_id )
            return false;
        const res = await this.model.getInvoice(this.props.record.data.invoice_siat_id);
        this.state.invoice = res.data || null;
    }
}
registry.category("view_widgets").add("siataccountmovedata", {component: SiatAccountMoveData});
