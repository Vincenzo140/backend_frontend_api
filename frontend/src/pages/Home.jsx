import React, { useState, useEffect } from 'react'
import CarList from '../components/CarList/CarList'
import { carService, brandService, modelService } from '../services/api'

const Home = () => {
  const [cars, setCars] = useState([])
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Buscar dados em paralelo
        const [carsData, brandsData, modelsData] = await Promise.all([
          carService.getCars(),
          brandService.getBrands(),
          modelService.getModels()
        ])
        
        setCars(carsData)
        setBrands(brandsData)
        setModels(modelsData)
      } catch (err) {
        console.error('Erro ao carregar dados:', err)
        setError('Erro ao carregar os dados. Verifique se o backend está rodando.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-dark mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando carros...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-hot mb-2">
          Erro ao carregar dados
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-hot mb-2">
          🚗 Sistema de Carros
        </h1>
        <p className="text-gray-600">
          Gerencie sua frota de veículos de forma simples e eficiente
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-dark mb-2">
            {cars.length}
          </div>
          <div className="text-gray-600">Total de Carros</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-orange-burnt mb-2">
            {brands.length}
          </div>
          <div className="text-gray-600">Marcas</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-yellow-soft mb-2">
            {models.length}
          </div>
          <div className="text-gray-600">Modelos</div>
        </div>
      </div>

      {/* Lista de Carros */}
      <CarList cars={cars} brands={brands} models={models} />
    </div>
  )
}

export default Home
