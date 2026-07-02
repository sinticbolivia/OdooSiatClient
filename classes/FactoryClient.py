from .Config import Config
from ..libs import client as siat


class FactoryClient:

    @staticmethod
    def instance_sync_service() -> siat.ServicioSincronizacion:
        cfg = Config.get_instance()
        service = siat.ServicioSincronizacion()
        service.set_server(cfg.server)
        if not cfg.token:
            service.login(cfg.username, cfg.password)
        else:
            service.set_token(cfg.token)
            if service.is_token_expired() is True:
                service.login(cfg.username, cfg.password)
                cfg.token = service.get_token()
                cfg.save()
        return service

    @staticmethod
    def instance_service() -> siat.ServicioFacturacion:
        cfg = Config.get_instance()
        service = siat.ServicioFacturacion()
        service.set_server(cfg.server)
        if not cfg.token:
            service.login(cfg.username, cfg.password)
        else:
            service.set_token(cfg.token)
            if service.is_token_expired() is True:
                service.login(cfg.username, cfg.password)
                cfg.token = service.get_token()
                cfg.save()
        return service
