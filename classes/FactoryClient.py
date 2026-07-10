from ..libs.client import Config
from ..libs import client as siat


class FactoryClient:
    @staticmethod
    def instance_type(type: str):
        cfg = Config.get_instance()
        service = siat.ServicioFacturacion() if type == 'facturacion' else siat.ServicioSincronizacion()
        service.set_config(cfg)

        return service
    @staticmethod
    def instance_sync_service() -> siat.ServicioSincronizacion:
        service = FactoryClient.instance_type('sync')

        if not service.get_token() or service.is_token_expired():
            service.login()
            service.get_config().save()

        return service

    @staticmethod
    def instance_service() -> siat.ServicioFacturacion:
        service = FactoryClient.instance_type('facturacion')

        if not service.get_token() or service.is_token_expired():
            service.login()
            service.get_config().save()

        return service
