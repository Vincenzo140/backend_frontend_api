from app_factory import create_app
from config import Config
from models.database import engine
from models import Base

# Criar tabelas no banco de dados
Base.metadata.create_all(bind=engine)

app = create_app()
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", reload=True, port=Config.port)