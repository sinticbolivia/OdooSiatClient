/** @odoo-module **/
import {Component, onMounted, useState, xml} from '@odoo/owl';
import {useService} from '@web/core/utils/hooks';

class DetalleExtranjera extends Component
{
	//removeFields: ['numero_serie', 'imei'],
	static template = xml`<div>
		<div class="row">
			<div class="col-12 col-sm-6">
				<div class="mb-2">
					<label>Tipo de Operacion</label>
					<select class="form-control form-select bg-warning" t-model="props.invoice.data.custom_fields.codigoTipoOperacion">
						<option value="1">Venta</option>
						<option value="2">Compra</option>
					</select>
				</div>
			</div>
			<div class="col-12 col-sm-6">
				<div class="mb-2">
					<label>Tipo de Cambio Oficial</label>
					<input type="text" class="form-control" required="required" t-model="props.invoice.data.custom_fields.tipoCambioOficial" />
				</div>
			</div>
		</div>
	</div>`;
	static props =  {
		invoice: {type: Object, optional: false},
	};
	setup()
	{
	    onMounted( () => {
	        this.props.invoice.data.custom_fields.codigoTipoOperacion = 1;
            this.props.invoice.data.custom_fields.tipoCambioOficial = 6.96;
            this.props.invoice.data.custom_fields.ingresoDiferenciaCambio = 0;
	    });

	}
};
class ItemExtranjera extends Component {
	
};
class ExtranjeraTotals extends Component
{
	static template = ``;
	static props = {
	    invoice: {type: Object, optional: false}
	};
	setup()
	{
	}
};

export {DetalleExtranjera, ItemExtranjera, ExtranjeraTotals};