/** @odoo-module **/

class SiatModel
{
	constructor(orm, resModel, fields, archInfo, domain)
	{
		this.orm = orm;
		this.resModel = resModel;
		// const { imageField, limit, tooltipField } = archInfo;
		//this.imageField = imageField;
		this.fields = fields;
		//this.limit = limit;
		this.domain = domain;
		//this.tooltipField = tooltipField;
		//this.keepLast = new KeepLast();
		//this.pager = { offset: 0, limit: limit };
		//if (!(imageField in this.fields)) {
			//throw `image_field error: ${imageField} is not a field of ${resModel}`;
		//}
		//if (!(tooltipField in this.fields)) {
			//throw `image_field error: ${tooltipField} is not a field of ${resModel}`;
		//}
	}
	async getCuis(sucursal, puntoventa)
	{
	    const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	    };
	    const res = await this.orm.call('siat_client.sync', 'get_cuis', [[]], args);
	    return res;
    }
    async getCufd(sucursal, puntoventa)
	{
	    const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	    };
	    const res = await this.orm.call('siat_client.sync', 'get_cufd', [[]], args);
	    return res;
    }
    async getActividades(sucursal, puntoventa)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
	    };
	    const res = await this.orm.call('siat_client.sync', 'get_actividades', [[]], args);
	    return res;
    }
    async getLeyendas(sucursal, puntoventa)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_leyendas', [[]], args);
	    return res;
    }
    async getMotivosAnulacion(sucursal, puntoventa)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_motivos_anulacion', [[]], args);
	    return res;
    }
    async getProductosServicios(sucursal, puntoventa)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_productos_servicios', [[]], args);
	    return res;
    }
    async getUnidadesMedida(sucursal, puntoventa)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_unidades_medida', [[]], args);
	    return res;
    }
    async getDocumentosIdentidad(sucursal, puntoventa)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_documentos_identidad', [[]], args);
	    return res;
    }
    async getMonedas(sucursal, puntoventa)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_monedas', [[]], args);
	    return res;
    }
    async getMetodosPago(sucursal, puntoventa)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_metodos_pago', [[]], args);
	    return res;
    }
    async getDocumentosSector(sucursal, puntoventa)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_tipos_documento_sector', [[]], args);
	    return res;
    }
    async getActividadesDocumentosSector(sucursal, puntoventa)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_actividades_documento_sector', [[]], args);
	    return res;
    }
    async getTiposHabitacion(sucursal, puntoventa)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_tipos_habitacion', [[]], args);
	    return res;
    }
    async getPuntosVenta(sucursal, puntoventa)
    {
        const args = {
	        sucursal: sucursal || 0,
	        puntoventa: puntoventa || 0,
        };
	    const res = await this.orm.call('siat_client.sync', 'get_puntosventa', [[]], args);
	    return res;
    }
    async getUserSectores()
    {
	    const res = await this.orm.call('siat_client.sync', 'get_user_documentos_sector', [[]], {});
	    return res;
    }
    async getInvoices(page)
    {
        const args = {
            page: page || 1,
	        //sucursal: sucursal || 0,
	        //puntoventa: puntoventa || 0,
        };
	    const res = await this.orm.call('siat_client.invoice', 'get_items', [[]], args);
	    return res;
    }
    async crearFactura(invoice)
    {
        const args = {invoice};
        const res = await this.orm.call('siat_client.invoice', 'create_invoice', [[]], args);
        return res;
    }
    async anular(id, motivoId)
    {
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
        const res = await this.orm.searchRead('product.product', search_domain, 0, limit);

        return res;
    }
}
export {SiatModel};