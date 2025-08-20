from models.database import engine
from models import Base

def init_db():
    """Inicializa o banco de dados criando todas as tabelas"""
    Base.metadata.create_all(bind=engine)
    print("Banco de dados inicializado com sucesso!")

if __name__ == "__main__":
    init_db()
