import React from 'react'

const CarList = ({ cars, brands, models }) => {
  // Agrupar carros por marca
  const carsByBrand = cars.reduce((acc, car) => {
    const model = models.find(m => m.id === car.modelo_id)
    const brand = brands.find(b => b.id === model?.brand_id)
    
    if (brand) {
      if (!acc[brand.id]) {
        acc[brand.id] = {
          brand,
          cars: []
        }
      }
      acc[brand.id].cars.push({
        ...car,
        model
      })
    }
    return acc
  }, {})

  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚗</div>
        <h3 className="text-xl font-semibold text-gray-hot mb-2">
          Nenhum carro encontrado
        </h3>
        <p className="text-gray-600">
          Adicione seu primeiro carro para começar!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {Object.values(carsByBrand).map(({ brand, cars }) => (
        <div key={brand.id} className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-8 bg-purple-dark rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-hot">
              {brand.nome_marca}
            </h2>
            <span className="bg-orange-burnt text-white px-3 py-1 rounded-full text-sm font-medium">
              {cars.length} {cars.length === 1 ? 'carro' : 'carros'}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const CarCard = ({ car }) => {
  return (
    <div className="card group hover:scale-105 transition-transform duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-dark to-orange-burnt rounded-lg flex items-center justify-center">
          <span className="text-white text-xl">🚗</span>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">ID</div>
          <div className="text-xs font-mono text-gray-400">
            {car.id.slice(0, 8)}...
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-hot mb-1">
            {car.model?.nome || 'Modelo não encontrado'}
          </h3>
          <p className="text-sm text-gray-500">
            {car.model?.brand?.nome_marca || 'Marca não encontrada'}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-orange-burnt">📅</span>
            <span className="text-gray-600">{car.ano}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-purple-dark">🎨</span>
            <span className="text-gray-600 capitalize">{car.cor}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-soft">⛽</span>
            <span className="text-gray-600 capitalize">{car.combustivel}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-hot">🚪</span>
            <span className="text-gray-600">{car.num_portas} portas</span>
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-400">
            Cadastrado em: {new Date(car.timestamp_cadastro).toLocaleDateString('pt-BR')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarList
