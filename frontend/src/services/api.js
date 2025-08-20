import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para logs de debug
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('❌ Erro na requisição:', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const carService = {
  // Buscar todos os carros
  getCars: async () => {
    const response = await api.get('/cars')
    return response.data
  },

  // Criar novo carro
  createCar: async (carData) => {
    const response = await api.post('/cars', carData)
    return response.data
  },

  // Buscar carro por ID
  getCar: async (id) => {
    const response = await api.get(`/cars/${id}`)
    return response.data
  },

  // Atualizar carro
  updateCar: async (id, carData) => {
    const response = await api.put(`/cars/${id}`, carData)
    return response.data
  },

  // Deletar carro
  deleteCar: async (id) => {
    const response = await api.delete(`/cars/${id}`)
    return response.data
  },
}

export const brandService = {
  // Buscar todas as marcas
  getBrands: async () => {
    const response = await api.get('/brands')
    return response.data
  },

  // Criar nova marca
  createBrand: async (brandData) => {
    const response = await api.post('/brands', brandData)
    return response.data
  },
}

export const modelService = {
  // Buscar todos os modelos
  getModels: async () => {
    const response = await api.get('/models')
    return response.data
  },

  // Criar novo modelo
  createModel: async (modelData) => {
    const response = await api.post('/models', modelData)
    return response.data
  },
}

export default api
