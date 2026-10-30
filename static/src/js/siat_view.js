/** @odoo-module **/

import { registry } from "@web/core/registry";
import { standardViewProps } from "@web/views/standard_view_props";
import { Layout } from "@web/search/layout";
import { SiatArchParser } from './siat_arch_parser';
import SiatViewController from './siat_controller';
import { SiatViewRenderer } from './siat_render';
import { SiatModel } from './siat_model';

export const SiatClientView = {
    type: "siatClient",
    display_name: "SiatClient",
    icon: "fa fa-picture-o",
    multiRecord: true,
    Controller: SiatViewController,
    Renderer: SiatViewRenderer,
    ArchParser: SiatArchParser,
    Model: SiatModel,

    props(genericProps, view)
    {
        const { ArchParser, Model, Renderer } = view;
        const { arch, relatedModels, resModel } = genericProps;
        const archInfo = new ArchParser().parse(arch);

        return {
            ...genericProps,
            archInfo,
            Model: view.Model,
            Renderer,
        };
    },
};
registry.category("views").add('siatClient', SiatClientView);
