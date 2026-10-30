import { Component, onMounted, onWillStart, useState, useRef, xml } from "@odoo/owl";
import { useService } from '@web/core/utils/hooks';
import { SiatModel } from '../siat_model';

export class SiatComponent extends Component
{
    setup()
    {
        this.orm = useService("orm");
        this.model = new SiatModel(this.orm);
        this.configurations = [];
    }
    get defaultConfig()
    {
        return this.configurations.find( cfg => cfg.is_default === true );
    }
    get currentConfig()
    {
        return this.state.config;
    }
    async getConfigs()
    {
        const resConfig = await this.orm.call('siat_client.config', 'read_all', [], {});
        this.configurations = resConfig;
        if( this.defaultConfig )
            this.state.config = this.defaultConfig;
        this.model.config = this.currentConfig;
        this.state.config_id = this.currentConfig.id;
    }
}