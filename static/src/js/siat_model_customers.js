/** @odoo-module **/

class SiatModelCustomers
{
    constructor(orm)
    {
        this.orm = orm;
    }
    __getSpecs()
    {
        return {"same_vat_partner_id":{"fields":{"display_name":{}}},"partner_gid":{},"additional_info":{},"same_company_registry_partner_id":{"fields":{"display_name":{}}},"sale_order_count":{},"pos_order_count":{},"currency_id":{"fields":{}},"total_invoiced":{},"payment_token_count":{},"avatar_128":{},"image_1920":{},"write_date":{},"is_company":{},"commercial_partner_id":{"fields":{}},"active":{},"company_id":{"fields":{"display_name":{}}},"fiscal_country_codes":{},"country_code":{},"company_type":{},"name":{},"parent_id":{"fields":{"display_name":{}},"context":{"default_is_company":true,"show_vat":true}},"company_name":{},"type":{},"street":{},"street2":{},"city":{},"state_id":{"fields":{"display_name":{}}},"zip":{},"country_id":{"fields":{"display_name":{}}},"vat":{},"function":{},"phone_blacklisted":{},"mobile_blacklisted":{},"phone":{},"mobile":{},"phone_sanitized":{},"user_ids":{},"is_blacklisted":{},"email":{},"website":{},"title":{"fields":{"display_name":{}}},"active_lang_count":{},"lang":{},"category_id":{"fields":{"display_name":{},"color":{}}},"child_ids":{"fields":{"id":{},"color":{},"name":{},"title":{"fields":{"display_name":{}}},"type":{},"email":{},"parent_id":{"fields":{"display_name":{}}},"is_company":{},"function":{},"phone":{},"street":{},"street2":{},"zip":{},"city":{},"country_id":{"fields":{"display_name":{}}},"mobile":{},"state_id":{"fields":{"display_name":{}}},"image_128":{},"avatar_128":{},"lang":{},"comment":{},"display_name":{},"write_date":{},"company_id":{"fields":{}},"user_id":{"fields":{}}},"limit":40,"order":"","context":{"default_type":"other"}},"user_id":{"fields":{"display_name":{}}},"property_payment_term_id":{"fields":{"display_name":{}}},"property_supplier_payment_term_id":{"fields":{"display_name":{}}},"barcode":{},"property_account_position_id":{"fields":{"display_name":{}}},"company_registry":{},"ref":{},"industry_id":{"fields":{"display_name":{}}},"property_stock_customer":{"fields":{"display_name":{}}},"property_stock_supplier":{"fields":{"display_name":{}}},"duplicated_bank_account_partners_count":{},"show_credit_limit":{},"bank_ids":{"fields":{"sequence":{},"acc_number":{},"bank_id":{"fields":{"display_name":{}}},"allow_out_payment":{},"acc_holder_name":{}},"limit":40,"order":"sequence ASC"},"peppol_eas":{},"peppol_endpoint":{},"credit":{},"days_sales_outstanding":{},"use_partner_credit_limit":{},"credit_limit":{},"comment":{},"display_name":{}};
    }
    _getCustomerFields()
    {
        return {
            id: 0,
            active: true,
            additional_info: false,
            bank_ids: [],
            barcode: false,
            category_id: [],
            child_ids: [],
            city: false,
            comment: false,
            company_id: false,
            company_name: false,
            company_registry: false,
            company_type: 'person',
            country_id: false,
            credit_limit: 0,
            email: '',
            'function': false,
            industry_id: false,
            is_company: false,
            lang: 'es_BO',
            mobile: false,
            name: '',
            parent_id: false,
            partner_gid: false,
            peppol_eas: false,
            peppol_endpoint: false,
            phone: false,
            property_account_position_id: false,
            property_payment_term_id: false,
            property_supplier_payment_term_id: false,
            ref: false,
            state_id: false,
            street: '',
            street2: false,
            //team_id: false,
            title: false,
            type: 'contact',
            vat: '',
            website: false,
            zip: false,
            email: '',
        };
    }
    getHeaders()
    {
        const token = odoo.csrf_token ;//document.querySelector('meta[name="csrf-token"]')
        const headers = {'X-CSRF-TOKEN': token || ''};

        return headers;
    }
    _prepareData(customer)
    {
        const data = Object.assign(this._getCustomerFields(), customer);
        delete data.firstname;
        delete data.lastname;
        delete data.id;

        return data;
    }
    async create(customer)
    {
        const data = this._prepareData(customer);
        //const headers = this.getHeaders();
        const res = await this.orm.call('res.partner', 'web_save', [[], data],
            {specification: this.__getSpecs()}
        );

        return res;
    }
    async update(customer)
    {
        const data = this._prepareData(customer);
        const res = await this.orm.call('res.partner', 'web_save',
            [[customer.id], data],
            {specification: this.__getSpecs()}
        );

        return res;
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
        const headers = this.getHeaders();
        const data = {
            keyword: keyword,
            //csrf_token: odoo.csrf_token,
        };
        const res = await this.orm.call('siat_client.invoice', 'search_customer', [[]], data)

        return res;
    }
}
export {SiatModelCustomers};