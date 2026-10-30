/** @odoo-module **/

class SiatModelCustomers
{
    constructor(orm)
    {
        this.orm = orm;
    }

    async create(customer)
    {
        const data = {
            name: `${customer.firstname} ${customer.lastname}`.trim(),
            email: customer.email,
            phone: customer.phone,
            is_company: false,
            company_name: customer.company_name,
            vat: customer.vat,
            street: customer.street,
        };
        const res = await this.orm.call('res.partner', 'create', [data]);
        return res;
    }
    async update(customer)
    {
        /*
        const res = await this.orm.call('res.partner', 'web_save',
            [[customer.id], data],
            {specification: this.__getSpecs()}
        );

        return res;
        */
    }
    async read(id)
    {
        const res = await this.Get(`/invoices/siat/v2/customers/${id}`);

        return res;
    }
    async readAll()
    {
        const res = await this.Get(`/invoices/siat/v2/customers`);

        return res;
    }
    async remove(id)
    {
        const headers = this.getHeaders();
        const res = await this.Delete(`/invoices/siat/v2/customers/${id}`, headers);

        return res;
    }
    async search(keyword)
    {
        const data = {
            keyword: keyword,
            //csrf_token: odoo.csrf_token,
        };
        const res = await this.orm.call('siat_client.invoice', 'search_customer', [[]], data)

        return res;
    }
}
export {SiatModelCustomers};