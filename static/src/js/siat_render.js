/** @odoo-module */
import { Component } from "@odoo/owl";
import { View } from "@web/views/view";

class SiatViewRenderer extends Component
{
	static template = 'siat_client.Renderer';
	static components = { View };
	async setup()
	{
		this.action = useService("action");
		console.log('SiatViewRenderer.setup', this);
	}
}
export {SiatViewRenderer};