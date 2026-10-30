/** @odoo-module */
import { XMLParser, visitXML, xml } from "@web/core/utils/xml";

export class SiatArchParser //extends XMLParser
{
    parse(arch)
    {
        console.log('SiatArchParser.parse', arch, arch.getAttribute("view"));
        //const xmlDoc = this.parseXML(arch);
        //console.log('xmlDoc', xmlDoc);
        const view = arch.getAttribute("view");
        return {
            view,
        };
    }
}