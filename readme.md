# Sistema de Gerenciamento de Carros

Sistema completo para gerenciamento de carros, marcas e modelos com backend FastAPI e frontend React.

## 🚀 Como executar

### Pré-requisitos
- Docker e Docker Compose instalados

### Execução rápida

**Windows:**
```bash
run_dev.bat
```

**Linux/Mac:**
```bash
chmod +x run_dev.sh
./run_dev.sh
```

### Execução manual

1. **Iniciar os containers:**
```bash
docker-compose up --build -d
```

2. **Aguardar o banco de dados estar pronto e inicializar:**
```bash
docker-compose exec backend python init_db.py
```

## 📖 Documentação da API

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## 🌐 Frontend

- **Aplicação React:** http://localhost:3000

## 🗄️ Estrutura do Banco

### Tabelas:
- **brands:** Marcas de carros
- **models:** Modelos de carros (relacionado com brands)
- **cars:** Carros (relacionado com models)

## 🔧 Endpoints

### Brands (/brands)
- `POST /` - Criar marca
- `GET /` - Listar marcas
- `GET /{id}` - Buscar marca por ID
- `PUT /{id}` - Atualizar marca
- `DELETE /{id}` - Deletar marca

### Models (/models)
- `POST /` - Criar modelo
- `GET /` - Listar modelos
- `GET /{id}` - Buscar modelo por ID
- `PUT /{id}` - Atualizar modelo
- `DELETE /{id}` - Deletar modelo

### Cars (/cars)
- `POST /` - Criar carro
- `GET /` - Listar carros
- `GET /{id}` - Buscar carro por ID
- `PUT /{id}` - Atualizar carro
- `DELETE /{id}` - Deletar carro

## 🛠️ Tecnologias

### Backend
- **FastAPI** - Framework web Python
- **SQLAlchemy** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Alembic** - Migrações de banco de dados

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento da aplicação
- **Axios** - Cliente HTTP

### Infraestrutura
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **Swagger/OpenAPI** - Documentação da API
