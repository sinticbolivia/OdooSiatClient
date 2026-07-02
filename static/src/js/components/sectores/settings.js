/** @odoo-module **/
import {DetalleAlquiler} from './alquiler';
import {DetalleColegio} from './colegios';
import {DetalleExportacion, TotalsExportacion} from './exportacion';
import {DetalleTuristico,} from './turistico-hospedaje';
import {DetalleHotel} from './hoteles';
import {DetalleExtranjera} from './moneda-extranjera';
import {DetalleHospital} from './hospitales';
import {DetalleServiciosBasicos, TotalsServiciosBasicos} from './servicios-basicos';
import {DetalleFinanciera, FinancieraTotals} from './entidad-financiera';
import {DetalleTasaCero} from './tasa-cero';
import {DetalleExportacionServicio} from './exportacion-servicio';
import {DetallePrevalorada} from './prevalorada';
import {DetalleTelecomunicaciones} from './telecomunicaciones';
import {IceTotals} from './productos-ice';
import {DetalleZonaFranca} from './zona-franca';
import {DetalleHidrocarburos} from './hidrocarburos';
import {DetalleBoletoAereo, TotalsBoletoAereo} from './boleto-aereo';

const SectoresSettings = {
	components: {
		'educativo_detalle': DetalleColegio,
		'turistico_detalle': DetalleTuristico,
		'hotel_detalle': DetalleHotel,
		'hospital_detalle': DetalleHospital,
		'financiera_detalle': DetalleFinanciera,
		'financiera_totals': FinancieraTotals,
		'tasacero_detalle': DetalleTasaCero,
		'exportservicio_detalle': DetalleExportacionServicio,
		'export_detalle': DetalleExportacion,
		'export_totals': TotalsExportacion,
		'alquiler_detalle': DetalleAlquiler,
		'prevalorada_detalle': DetallePrevalorada,
		'serviciosbasicos_detalle': DetalleServiciosBasicos,
		'serviciosbasicos_totals': TotalsServiciosBasicos,
		'extranjera_detalle': DetalleExtranjera,
		'ice_totals': IceTotals,
		'telecom_detalle': DetalleTelecomunicaciones,
		'zonafranca_detalle': DetalleZonaFranca,
		'hidrocarburos_detalle': DetalleHidrocarburos,
		'ventacombustible_detalle': DetalleHidrocarburos,
		'boletoaereo_detalle': DetalleBoletoAereo,
		'boletoaereo_totals': TotalsBoletoAereo,
	}
};
export default SectoresSettings;