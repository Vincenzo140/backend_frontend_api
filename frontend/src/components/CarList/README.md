# Componente CarList

## Descrição

O componente `CarList` é responsável por exibir uma lista de carros agrupados por marca, com cards estilizados para cada veículo.

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `cars` | `Array` | Array de objetos carro com os dados dos veículos |
| `brands` | `Array` | Array de objetos marca para relacionamento |
| `models` | `Array` | Array de objetos modelo para relacionamento |

## Estrutura dos Dados

### Carro
```javascript
{
  id: string,
  modelo_id: string,
  ano: number,
  combustivel: string,
  num_portas: number,
  cor: string,
  timestamp_cadastro: string
}
```

### Marca
```javascript
{
  id: string,
  nome_marca: string
}
```

### Modelo
```javascript
{
  id: string,
  brand_id: string,
  nome: string,
  valor_fipe: number
}
```

## Funcionalidades

- **Agrupamento por marca**: Os carros são automaticamente agrupados por marca
- **Cards responsivos**: Layout em grid que se adapta a diferentes tamanhos de tela
- **Informações detalhadas**: Exibe todos os dados do carro de forma organizada
- **Estado vazio**: Mostra uma mensagem amigável quando não há carros
- **Animações**: Hover effects e transições suaves

## Uso

```jsx
import CarList from './components/CarList/CarList'

function Home() {
  const [cars, setCars] = useState([])
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])

  return (
    <CarList 
      cars={cars}
      brands={brands}
      models={models}
    />
  )
}
```

## Estilização

O componente utiliza Tailwind CSS com as seguintes cores personalizadas:
- **Purple Dark**: `#5D3FD3`
- **Orange Burnt**: `#FF6B35`
- **Yellow Soft**: `#FFD23F`
- **Gray Hot**: `#2E2E2E`
- **Gray Light**: `#F4F4F4`

## Responsividade

- **Mobile**: 1 coluna
- **Tablet**: 2 colunas
- **Desktop**: 3 colunas
- **Large Desktop**: 4 colunas
