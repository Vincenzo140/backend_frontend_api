from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
import os

# Configuração de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ManagementSystem")


def create_app() -> FastAPI:
    # Descrição que será exibida na documentação (Swagger UI)
    description_api_access = f"se quiser acessar as rotas vá para http://localhost:8000/docs", f"se quiser acessar a documentação vá para http://localhost:8000/redoc"
    description = """
     Bem-vindo(a) à Car Management API!

    Esta API fornece recursos para gerenciar um sistema de carros, incluindo:
    - Marcas (Brands)
    - Modelos (Models)
    - Carros (Cars)


    Contato

    Em caso de dúvidas, por favor entre em contato:

    - Github: (https://github.com/Vincenzo140)
    - LinkedIn: (https://www.linkedin.com/in/vincenzo-amendola-9aab38264/)
    - Email: (mailto:vincenzo.amendola141@gmail.com)
    """

    app = FastAPI(
        title="Car Management API",
        version="1.0.0",
        description=description,
        contact={
            "name": "Vincenzo Amendola",
            "github": "https://github.com/Vincenzo140",
            "email": "vincenzo.amendola141@gmail.com",
            "linkedin": "https://www.linkedin.com/in/vincenzo-amendola-9aab38264/",
        },
        swagger_ui_parameters={
            "syntaxHighlight.theme": "monokai",
            "layout": "BaseLayout",
            "filter": True,
            "tryItOutEnabled": True,
            "onComplete": "Ok",
            "docExpansion": "full",
            "showExtensions": True,
            "apisSorter": "alpha",
            "supportedSubmitMethods": ["get", "post", "put", "delete"],
            "defaultModelsExpandDepth": 0,
        },
    )


    # Configurações de CORS (Cross-Origin Resource Sharing)
    CORS_SETTINGS = {
        "allow_origins": ["*"],  # Permite qualquer origem. Em produção, seja mais restritivo.
        "allow_credentials": True,
        "allow_methods": ["*"],
        "allow_headers": ["*"],
    }

    app.add_middleware(
        CORSMiddleware,
        allow_origins=CORS_SETTINGS["allow_origins"],
        allow_credentials=CORS_SETTINGS["allow_credentials"],
        allow_methods=CORS_SETTINGS["allow_methods"],
        allow_headers=CORS_SETTINGS["allow_headers"],
        max_age=30,
    )

    # Rota principal, retorna informações básicas csobre a API
    @app.get("/")
    def read_root():
        logger.info("Servidor iniciado com sucesso")
        return description_api_access

    # Importa e configura as rotas de cada módulo
    from controller.brand import configure as brand_router
    from controller.model import configure as model_router
    from controller.car import configure as car_router

    brand_router(app)
    model_router(app)
    car_router(app)                                                                                                                                                                                                                                                                                                                                                                 

    return app