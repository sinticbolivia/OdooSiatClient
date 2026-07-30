odoo.define('siat_client.selection_dataset', function (require) {
    const core = require('web.core');
    const _t = core._t;
    const _lt = core._lt;
    const AbstractField = require('web.AbstractField');
    const {FieldSelection} = require('web.relational_fields');
    const registry = require('web.field_registry');

    const FieldSectionDataset = FieldSelection.extend({
        description: _lt("Selection with Dataset"),
        //template: 'siat_client.FieldSelectionDataset',
        /**
         * @override
         * @private
         */
        _renderEdit: function ()
        {
            //console.log('FieldSectionDataset._renderEdit', this.values);
            this.$el.empty();
            var required = this.attrs.modifiersValue && this.attrs.modifiersValue.required;
            for (var i = 0 ; i < this.values.length ; i++)
            {
                var disabled = required && this.values[i][0] === false;
                let dataset = '';
                if( this.values[i][1] && this.values[i][1].includes('|') )
                {
                    const vd = this.values[i][1].split('|');
                    dataset = vd[1].trim();
                }

                this.$el.append($('<option/>', {
                    value: this.values[i][0],
                    text: this.values[i][1],
                    style: disabled ? "display: none" : "",
                    'data-actividad': dataset,
                }));
            }
            //console.log('RawValue', this.$el, this._getRawValue());
            //this.$el.val(JSON.stringify(this._getRawValue()));
            this.$el.val(this._getRawValue());
        },
        /**
         * @override
         * @private
         */
        _renderReadonly: function () {
            //console.log('_renderReadonly', this.values/*this.$el, this.value, this.recordData, this.nodeOptions, this.field*/);
            const found = this.values.find( el => el[0] == this.value);
            this.$el.empty().text(found[1] || 'Valor desconocido');
            this.$el.attr('raw-value', this._getRawValue());
        },
    });
    registry.add('fieldselection_dataset', FieldSectionDataset);
    return FieldSectionDataset;
});
/*
import { SelectionField } from "@web/views/fields/selection/selection_field";
import { registry } from "@web/core/registry";
import { patch } from "@web/core/utils/patch";

export class DatasetSelectionField extends SelectionField
{
    static template = 'siat_client.SelectionDataset';
    get options()
    {
        // Run original options logic
        const rawOptions = super.options;

        // Map over options to extract dataset variables
        return rawOptions.map(option => {
            const valueStr = option[0];
            if (valueStr && valueStr.includes('|'))
            {
                const parts = valueStr.split('|');
                return {
                    value: valueStr,          // Keeps true technical key for database match
                    label: option[1],
                    datasetAttr: parts[1]     // Extracted metadata string
                };
            }
            return { value: option[0], label: option[1], datasetAttr: '' };
        });
    }
}
*/
//registry.category("fields").add("selection_dataset", DatasetSelectionField);