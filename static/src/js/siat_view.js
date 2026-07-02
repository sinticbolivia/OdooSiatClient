/** @odoo-module */

import { registry } from "@web/core/registry";
import SiatViewController from './siat_controller';
import { SiatArchParser } from './siat_arch_parser';
import { SiatViewRenderer } from './siat_render';
import { SiatModel } from './siat_model';

//import { mountComponent } from "@web/env";
import { Component, whenReady, useState, onWillStart, onMounted } from "@odoo/owl";

//whenReady( () => mountComponent(SiatView, document.body));
export const siatClientView = {
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
registry.category("views").add("siatClient", siatClientView);
