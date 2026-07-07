# Acerca del Modulo Cliente de Facturacion SIAT para Odoo

El modulo le permite realizar la integracion para poder emitir Facturas SIAT en Odoo, utilizando la API de Facturacion 
de Sintic Bolivia (MonoInvoices).

Puede encontrar la documentacion de la API en el siguiente enlace.

https://monoinvoices.docs.apiary.io/

Para poder utilizar el modulo, debe tener las credenciales de acceso a la API, las cuales se le proporcionan adquiriendo
una suscripcion con Sintic Bolivia.

https://sinticbolivia.net

# Version de Odoo Compatibles

El modulo de facturacion, es compatible con versiones de Odoo 18 y 19, Community y Enterprise.
NOTA: El modulo funciona en los tipos de instalacion On-Premise y Odoo.sh.

# Instalacion

La instalacion es bastante sencilla, solo debe copiar o clonar el modulo dentro de la carpeta de addons de Odoo
Una vez instalado el modulo, debe reiniciar el servicio de Odoo

# Configuracion

Para la configuracion, se debe asignar los datos de conexion a la API dentro del archivo siat_data/config.json

Ejemplo:

```
{"server": "https://demosiat.1bytebo.net", "username": "valkiria2_400", "password": "valkiria2_400"}
```