#!/bin/bash

echo "🚀 Iniciando o sistema de carros..."

# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker primeiro."
    exit 1
fi

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker-compose down

# Construir e iniciar os containers
echo "🔨 Construindo e iniciando containers..."
docker-compose up --build -d

# Aguardar o banco de dados estar pronto
echo "⏳ Aguardando o banco de dados estar pronto..."
sleep 10

# Inicializar o banco de dados
echo "🗄️ Inicializando banco de dados..."
docker-compose exec backend python init_db.py

echo "✅ Sistema iniciado com sucesso!"
echo "📖 API disponível em: http://localhost:8000/docs"
echo "📚 Documentação em: http://localhost:8000/redoc"
echo "🌐 Frontend disponível em: http://localhost:3000"
