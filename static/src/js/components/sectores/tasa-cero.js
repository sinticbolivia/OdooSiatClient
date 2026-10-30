/** @odoo-module **/
import { Component, onMounted, onWillStart, useState, xml } from "@odoo/owl";

class DetalleTasaCero extends Component {}
class ItemTasaCero extends Component
{
	static template = xml`<div class="tasa-cero-item">
	</div>`;
	static props = {
		invoice: {type: Object, optional: false},
		item: {type: Object, optional: false},
	};
	setup ()
	{
		
	}
}
export {DetalleTasaCero, ItemTasaCero};