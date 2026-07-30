/** @odoo-module */
import { XMLParser } from "@web/core/utils/xml";

export class SiatArchParser extends XMLParser
{
    parse(arch)
    {
        console.log('SiatArchParser.parse', arch);
        const xmlDoc = this.parseXML(arch);
        //console.log('xmlDoc', xmlDoc);
        const view = xmlDoc.getAttribute("view");
        return {
            view,
        };
    }
}