/** @odoo-module **/

class SiatModel
{
	constructor(orm, resModel, fields, archInfo, domain)
	{
		this.orm = orm;
		this.resModel = resModel;
		this.fields = fields;
		this.domain = domain;
		this.config = null;
	}
	async getCuis(sucursal, puntoventa, config_id)
	{
	    const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
	    };
	    const res = await this.orm.call('siat_client.sync', 'get_cuis', [[]], args);
	    return res;
    }
    async getCufd(sucursal, puntoventa, config_id)
	{
	    const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
	    };
	    const res = await this.orm.call('siat_client.sync', 'get_cufd', [[]], args);
	    return res;
    }
    async getActividades(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
	    };
	    const res = await this.orm.call('siat_client.sync', 'get_actividades', [[]], args);
	    return res;
    }
    async getLeyendas(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_leyendas', [[]], args);
	    return res;
    }
    async getMotivosAnulacion(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_motivos_anulacion', [[]], args);
	    return res;
    }
    async getProductosServicios(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_productos_servicios', [[]], args);
	    return res;
    }
    async getUnidadesMedida(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_unidades_medida', [[]], args);
	    return res;
    }
    async getDocumentosIdentidad(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_documentos_identidad', [[]], args);
	    return res;
    }
    async getMonedas(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_monedas', [[]], args);
	    return res;
    }
    async getMetodosPago(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_metodos_pago', [[]], args);
	    return res;
    }
    async getDocumentosSector(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_tipos_documento_sector', [[]], args);
	    return res;
    }
    async getActividadesDocumentosSector(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_actividades_documento_sector', [[]], args);
	    return res;
    }
    async getTiposHabitacion(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_tipos_habitacion', [[]], args);
	    return res;
    }
    async getTiposEventos(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_tipos_eventos', [[]], args);
	    return res;
    }
    async getTiposEmision(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_tipos_emision', [[]], args);
	    return res;
    }
    async getTiposFacturas(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_tipos_facturas', [[]], args);
	    return res;
    }
    async getTiposPuntoVenta(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_tipos_puntoventa', [[]], args);
	    return res;
    }
    async getSucursales(config_id)
    {
        const args = {
            config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_sucursales', [[]], args);
	    return res;
    }
    async getPuntosVenta(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_puntosventa', [[]], args);
	    return res;
    }
    async getUserSectores(config_id)
    {
        const args = {config_id: config_id || this.config.id,};
	    const res = await this.orm.call('siat_client.sync', 'get_user_documentos_sector', [[]], args);
	    return res;
    }
    async getInvoices(page, config_id)
    {
        const args = {
            config_id: config_id || this.config.id,
            page: page || 1,
	        //sucursal: sucursal || 0,
	        //puntoventa: puntoventa || 0,
        };
	    const res = await this.orm.call('siat_client.invoice', 'get_items', [[]], args);
	    return res;
    }
    async crearFactura(invoice, config_id)
    {
        const args = {invoice, config_id: config_id || this.config.id,};
        const res = await this.orm.call('siat_client.invoice', 'create_invoice', [[]], args);
        return res;
    }
    async getInvoice(id, config_id)
    {
        const args = {
            invoice_id: id,
            config_id: config_id || this.config.id,
        };
        const res = await this.orm.call('siat_client.invoice', 'get_invoice', [[]], args);
        return res;
    }
    async anular(id, motivoId, config_id)
    {
        const args = {id, motivoId, config_id: config_id || this.config.id,};
        const res = await this.orm.call('siat_client.invoice', 'void_invoice', [[]], args);

        return res;
    }
    async revertir(id, config_id)
    {
        const args = {id, config_id: config_id || this.config.id,};
        const res = await this.orm.call('siat_client.invoice', 'revert_invoice', [[]], args);

        return res;
    }
    async buscarProducto(keyword, limit)
    {
        limit = limit || 10;
        const search_domain =  [
            '|', '|',
			['default_code', 'ilike', keyword],
			['product_tmpl_id.name', 'ilike', keyword],
			['barcode', 'ilike', keyword]
        ];
        const res = await this.orm.searchRead('product.product', search_domain, [], {offset: 0, limit});

        return res;
    }
    async getEvents(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.event', 'read_all', [[]], args);
	    return res;
    }
    async getAllCufds(sucursal, puntoventa, config_id)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	        config_id: config_id || this.config.id,
        };
	    const res = await this.orm.call('siat_client.sync', 'read_all_cufds', [[]], args);
	    return res;
    }
}
//odoo.define('siat_cllient.SiatModel', function (require) {return SiatModel;});
export {SiatModel};