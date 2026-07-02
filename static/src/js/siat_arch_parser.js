/** @odoo-module */
import { XMLParser, visitXML, xml } from "@web/core/utils/xml";
//const xml = require('@web/core/utils/xml');

export class SiatArchParser //extends XMLParser
{
    parse(arch, models, modelName, jsClass)
    {
        console.log('SiatArchParser.parse', arch, arch.getAttribute("view"));
        //const xmlDoc = xml.parseXML(arch);
        //console.log('xmlDoc', xmlDoc);
        const view = arch.getAttribute("view");
        return {
            view,
        };
    }
}