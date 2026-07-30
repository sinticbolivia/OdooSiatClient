/** @odoo-module **/

import { registry } from "@web/core/registry";
import { standardViewProps } from "@web/views/helpers/standard_view_props";
import { Layout } from "@web/views/layout";
import { SiatArchParser } from './siat_arch_parser';
//import { SiatViewRenderer } from './siat_render';
const { Component } = owl;
import { SiatSync } from './components/sync';
import { SiatInvoices } from './components/invoices';
import { SiatInvoicer } from './components/invoicer';

export class SiatClientView extends Component
{
    static ArchParser = SiatArchParser;
    static type = 'siatClient';
    static icon = "fa-bar-chart";
    static display_name = 'Siat Client View';
    static template = "siat_client.app";
    static props = {
        ...standardViewProps,
    };
    static components = { Layout, SiatSync, SiatInvoices, SiatInvoicer };

    setup()
    {
        const { arch, fields } = this.props;
        const parser = new SiatArchParser();
        const archData = parser.parse(arch);
        this.props.view = archData.view;
    }
}
registry.category("views").add('siatClient', SiatClientView);
