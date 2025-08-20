@echo off
echo 🚀 Iniciando o sistema de carros...

REM Verificar se o Docker está rodando
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker não está rodando. Por favor, inicie o Docker primeiro.
    pause
    exit /b 1
)

REM Parar containers existentes
echo 🛑 Parando containers existentes...
docker-compose down

REM Construir e iniciar os containers
echo 🔨 Construindo e iniciando containers...
docker-compose up --build -d

REM Aguardar o banco de dados estar pronto
echo ⏳ Aguardando o banco de dados estar pronto...
timeout /t 10 /nobreak >nul

REM Inicializar o banco de dados
echo 🗄️ Inicializando banco de dados...
docker-compose exec backend python init_db.py

echo ✅ Sistema iniciado com sucesso!
echo 📖 API disponível em: http://localhost:8000/docs
echo 📚 Documentação em: http://localhost:8000/redoc
echo 🌐 Frontend disponível em: http://localhost:3000
pause
