/** @odoo-module **/

import { Layout } from "@web/search/layout";
import { Component, whenReady, useState, onWillStart, onMounted, onPatched } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
//import { loadAssets } from '@web/core/assets';
import { SiatSync } from './components/sync';
import { SiatInvoices } from './components/invoices';
import { SiatInvoicer } from './components/invoicer';

class SiatViewController extends Component
{
	static template = 'siat_client.app';
	//static props = {};
	static components = { Layout, SiatSync, SiatInvoices, SiatInvoicer };

	async setup()
	{
		this.props.view = this.props.archInfo.view;
		this.orm = useService("orm");
		onWillStart(async () => {
			console.log('SiatClientViewController.onWillStart');
		});
		onMounted( async () => {
			console.log('siat_controller.js mounted', /*assets,*/ this);
		});
	}
}
export default SiatViewController;
