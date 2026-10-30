/** @odoo-module **/
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { SelectionField } from "@web/views/fields/selection/selection_field";
import { registry } from "@web/core/registry";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";
import { Component, useState, useEffect, onWillStart } from "@odoo/owl";

export class DatasetSelectionField extends SelectionField
{
    static template = 'siat_client.SelectionDataset';
    static props = {
        ...standardFieldProps,
        parentField: {type: String, optional: true},
    };

    setup()
    {
        this.orm = useService("orm");
        console.log('setup', this.props);
        this.state = useState({
            options: [],
        });
        useEffect(
            (parentValue) => {
                if (this.props.parentField) {
                    this.loadOptions(parentValue);
                }
            },
            () => [
                this.props.parentField
                    ? this.props.record.data[this.props.parentField]
                    : null,
            ]
        );
    }
    get currentValue()
    {
        const value = this.props.record.data[this.props.name];
        return value === false || value === undefined ? "" : String(value);
    }
    async loadOptions(parentValue)
    {
        console.log('loadOptions', this.props.name, this.props.parentField, this.props.record, parentValue);
        const current = this.props.record.data[this.props.name];
        if( this.props.name == 'unidad_medida' )
        {
            const res = await this.orm.call('siat_client.sync', 'get_unidades_medida', [], {config_id: parentValue.id});
            console.log(res);
            let index = 0;
            this.state.options = res.data.RespuestaListaParametricas.listaCodigos.map( (item) => {
                return {
                    key: index++,
                    label: item.descripcion,
                    value: String(item.codigoClasificador),
                    datasetAttr: '',
                }
            });
        }
        else if( this.props.name == 'actividad_economica' )
        {
            const res = await this.orm.call('siat_client.sync', 'get_actividades', [], {config_id: parentValue.id});
            console.log(res);
            let index = 0;
            this.state.options = res.data.RespuestaListaActividades.listaActividades
                .map( (item) => {
                    return {
                        key: index++,
                        label: item.descripcion,
                        value: item.codigoCaeb,
                        datasetAttr: '',
                    }
                });
        }
        else if( this.props.name == 'codigo_producto_sin' )
        {
            const res = await this.orm.call('siat_client.sync', 'get_productos_servicios', [], {config_id: parentValue.id});
            let index = 0;
            const options = res.data.RespuestaListaProductos.listaCodigos;
            if( parentValue )
            {
                console.log('filtering for', parentValue);
                this.state.options = options
                    .filter( (item) => parentValue == item.codigoActividad)
                    .map( (item) => {
                        return {
                            key: index++,
                            label: item.descripcionProducto,
                            value: String(item.codigoProducto),
                            datasetAttr: item.codigoActividad,
                        };
                    });
            }
            else
            {
                this.state.options = options
                    .map( (item) => {
                        return {
                            key: index++,
                            label: item.descripcionProducto,
                            value: item.codigoProducto,
                            datasetAttr: item.codigoActividad,
                        };
                    });
            }
        }
    }
    onChange(event)
    {
        this._setValue(event.target.value);
    }
    _setValue(val)
    {
        this.props.record.update({
            [this.props.name]: val || false,
        });
    }
}

registry.category("fields").add("siat_client.selection_dataset", {
    component: DatasetSelectionField,
    supportedTypes: ['selection', 'char', 'integer'],
    extractProps: ({ attrs }) => ({
        //optionsUrl: attrs.optionsUrl,
        parentField: attrs.parentField,
    }),
});
