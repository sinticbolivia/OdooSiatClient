/** @odoo-module **/
const {Component, useState} = owl;
const {onMounted, onWillStart} = owl.hooks;

export class SiatSyncUnidadesMedida extends Component
{
    static template = 'siat_client.sync_parametricas';
    static props = {
        title: {type: String, optional: true},
        sucursal: {type: Number, optional: false},
        puntoventa: {type: Number, optional: false},
        model: {type: Object, optional: false},
    };

    setup()
    {
        this.state = useState({
            lista: [],
        });
        onWillStart( () => {
            this.getData();
        });
    }
    async getData()
    {
        const res = await this.props.model.getUnidadesMedida();
        this.state.lista = res.data.RespuestaListaParametricas.listaCodigos || [];
    }
}