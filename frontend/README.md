# Frontend - Sistema de Gerenciamento de Carros

Aplicação React para gerenciamento de carros, desenvolvida com Vite, Tailwind CSS e React Router.

## 🚀 Como executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- Backend rodando em http://localhost:8000

### Instalação e execução

1. **Instalar dependências:**
```bash
npm install
```

2. **Executar em modo de desenvolvimento:**
```bash
npm run dev
```

3. **Acessar a aplicação:**
```
http://localhost:3000
```

## 🛠️ Tecnologias utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server
- **React Router** - Roteamento da aplicação
- **Tailwind CSS** - Framework CSS utilitário
- **Axios** - Cliente HTTP para requisições à API

## 📁 Estrutura do projeto

```
src/
├── components/
│   ├── CarList/
│   │   ├── CarList.jsx      # Componente principal de listagem
│   │   └── README.md        # Documentação do componente
│   └── Navbar.jsx           # Barra de navegação
├── pages/
│   ├── Home.jsx             # Página inicial com lista de carros
│   └── AddCar.jsx           # Página de cadastro de carros
├── services/
│   └── api.js               # Serviços de comunicação com a API
├── App.jsx                  # Componente principal
├── main.jsx                 # Ponto de entrada
└── index.css                # Estilos globais
```

## 🎨 Paleta de cores

- **Purple Dark**: `#5D3FD3` - Cor principal
- **Orange Burnt**: `#FF6B35` - Cor secundária
- **Yellow Soft**: `#FFD23F` - Cor de destaque
- **Gray Hot**: `#2E2E2E` - Texto principal
- **Gray Light**: `#F4F4F4` - Fundo

## 🔧 Funcionalidades

### Página Inicial (/)
- Lista todos os carros agrupados por marca
- Cards estilizados com informações detalhadas
- Layout responsivo com grid flexível
- Estatísticas gerais (total de carros, marcas, modelos)
- Estados de loading e erro

### Página de Cadastro (/add-car)
- Formulário completo para cadastro de carros
- Seleção cascata de marca → modelo
- Validação de campos obrigatórios
- Feedback visual de sucesso/erro
- Redirecionamento automático após cadastro

## 📱 Responsividade

A aplicação é totalmente responsiva com breakpoints:
- **Mobile**: 1 coluna de cards
- **Tablet**: 2 colunas de cards
- **Desktop**: 3 colunas de cards
- **Large Desktop**: 4 colunas de cards

## 🔌 Integração com API

A aplicação consome os seguintes endpoints:
- `GET /cars` - Listar carros
- `POST /cars` - Criar carro
- `GET /brands` - Listar marcas
- `GET /models` - Listar modelos

## 🚀 Scripts disponíveis

- `npm run dev` - Executar em modo desenvolvimento
- `npm run build` - Gerar build de produção
- `npm run preview` - Visualizar build de produção
- `npm run lint` - Executar linter

## 📝 Componentes

### CarList
Componente reutilizável para exibição de carros agrupados por marca.

**Props:**
- `cars` - Array de carros
- `brands` - Array de marcas
- `models` - Array de modelos

**Funcionalidades:**
- Agrupamento automático por marca
- Cards responsivos com hover effects
- Estado vazio com mensagem amigável
- Animações suaves

## 🔒 Validações

- Campos obrigatórios no formulário
- Validação de ano (1900 até ano atual + 1)
- Seleção cascata marca → modelo
- Feedback visual de erros da API
