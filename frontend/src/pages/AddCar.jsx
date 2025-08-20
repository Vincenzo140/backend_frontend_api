import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { carService, brandService, modelService } from '../services/api'

const AddCar = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedBrandId, setSelectedBrandId] = useState('')
  const [filteredModels, setFilteredModels] = useState([])
  const [showBrandDropdown, setShowBrandDropdown] = useState(false)
  const [showModelDropdown, setShowModelDropdown] = useState(false)
  
  const [formData, setFormData] = useState({
    modelo_id: '',
    ano: '',
    combustivel: '',
    num_portas: '',
    cor: ''
  })



  // Buscar marcas e modelos ao carregar a página
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsData, modelsData] = await Promise.all([
          brandService.getBrands(),
          modelService.getModels()
        ])
        setBrands(brandsData)
        setModels(modelsData)
      } catch (err) {
        console.error('Erro ao carregar dados:', err)
        setMessage({
          type: 'error',
          text: 'Erro ao carregar marcas e modelos. Verifique se o backend está rodando.'
        })
      }
    }
    fetchData()
  }, [])

  // Filtrar modelos quando uma marca é selecionada
  useEffect(() => {
    if (selectedBrandId) {
      const filtered = models.filter(model => model.brand_id === selectedBrandId)
      setFilteredModels(filtered)
    } else {
      setFilteredModels([])
    }
  }, [selectedBrandId, models])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBrandInputChange = (e) => {
    const value = e.target.value
    setSelectedBrand(value)
    setSelectedBrandId('')
    setShowBrandDropdown(value.length > 0)
    setModelInputText('') // Limpar campo modelo quando marca muda
  }

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand.nome_marca)
    setSelectedBrandId(brand.id)
    setShowBrandDropdown(false)
    setModelInputText('') // Limpar campo modelo quando marca muda
  }

  const handleModelInputChange = (e) => {
    const value = e.target.value
    setModelInputText(value)
    setShowModelDropdown(value.length > 0 && filteredModels.length > 0)
  }

  const handleModelInputFocus = () => {
    setShowModelDropdown(filteredModels.length > 0 && selectedBrandId)
  }

  // Estado para o texto digitado no campo modelo
  const [modelInputText, setModelInputText] = useState('')

  const handleModelSelect = (model) => {
    setModelInputText(model.nome)
    setShowModelDropdown(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
                                       // Validação básica
       if (!selectedBrandId || !modelInputText.trim() || !formData.ano || !formData.combustivel || !formData.num_portas || !formData.cor) {
         setMessage({
           type: 'error',
           text: 'Por favor, preencha todos os campos.'
         })
         return
       }

         try {
       setLoading(true)
       setMessage({ type: '', text: '' })
       
       // Verificar se o modelo já existe
       const existingModel = filteredModels.find(model => 
         model.nome.toLowerCase() === modelInputText.trim().toLowerCase()
       )
       
       let modeloId = existingModel ? existingModel.id : null
       
       // Se não existe, criar o modelo primeiro
       if (!existingModel) {
         try {
           const newModel = await modelService.createModel({
             brand_id: selectedBrandId,
             nome: modelInputText.trim(),
             valor_fipe: 0 // Valor padrão para novos modelos
           })
           modeloId = newModel.id
         } catch (modelErr) {
           console.error('Erro ao criar modelo:', modelErr)
           setMessage({
             type: 'error',
             text: 'Erro ao criar modelo. Tente novamente.'
           })
           return
         }
       }
       
       // Criar o carro com o modelo_id correto
       const carData = {
         ...formData,
         modelo_id: modeloId,
         ano: parseInt(formData.ano),
         num_portas: parseInt(formData.num_portas)
       }
        
       await carService.createCar(carData)
      
      setMessage({
        type: 'success',
        text: 'Carro cadastrado com sucesso! Redirecionando...'
      })
      
             // Limpar formulário
       setFormData({
         modelo_id: '',
         ano: '',
         combustivel: '',
         num_portas: '',
         cor: ''
       })
       setSelectedBrand('')
       setSelectedBrandId('')
       setModelInputText('')
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate('/')
      }, 2000)
      
    } catch (err) {
      console.error('Erro ao cadastrar carro:', err)
      setMessage({
        type: 'error',
        text: err.response?.data?.detail || 'Erro ao cadastrar carro. Tente novamente.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-hot mb-2">
          🚗 Adicionar Novo Carro
        </h1>
        <p className="text-gray-600">
          Preencha os dados do veículo para cadastrá-lo no sistema
        </p>
      </div>

      {/* Mensagem de feedback */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

             {/* Formulário */}
       <form onSubmit={handleSubmit} className="card space-y-6">
         {/* Campo de Marca */}
         <div className="relative">
           <label className="block text-sm font-medium text-gray-700 mb-2">
             Marca *
           </label>
           <input
             type="text"
             value={selectedBrand}
             onChange={handleBrandInputChange}
             onFocus={() => setShowBrandDropdown(selectedBrand.length > 0)}
             onBlur={() => setTimeout(() => setShowBrandDropdown(false), 200)}
             className={`input-field ${selectedBrandId ? 'border-green-500 bg-green-50' : ''}`}
             placeholder="Digite o nome da marca..."
             required
           />
           {selectedBrandId && (
             <div className="absolute right-3 top-8 text-green-500">
               ✓
             </div>
           )}
           {showBrandDropdown && (
             <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
               {brands
                 .filter(brand => 
                   brand.nome_marca.toLowerCase().includes(selectedBrand.toLowerCase())
                 )
                 .map(brand => (
                   <div
                     key={brand.id}
                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                     onClick={() => handleBrandSelect(brand)}
                   >
                     {brand.nome_marca}
                   </div>
                 ))}
             </div>
           )}
         </div>

         {/* Campo de Modelo */}
         <div className="relative">
           <label className="block text-sm font-medium text-gray-700 mb-2">
             Modelo *
           </label>
                       <input
              type="text"
              value={modelInputText}
              onChange={handleModelInputChange}
              onFocus={handleModelInputFocus}
              onBlur={() => setTimeout(() => setShowModelDropdown(false), 200)}
                             className={`input-field ${modelInputText.trim() ? 'border-green-500 bg-green-50' : ''}`}
              placeholder={selectedBrandId ? "Digite o nome do modelo..." : "Primeiro selecione uma marca"}
              disabled={!selectedBrandId}
              required
            />
                                               {modelInputText.trim() && (
               <div className="absolute right-3 top-8 text-green-500">
                 ✓
               </div>
             )}
           {showModelDropdown && (
             <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
               {filteredModels
                 .filter(model => 
                   model.nome.toLowerCase().includes(modelInputText.toLowerCase())
                 )
                 .map(model => (
                   <div
                     key={model.id}
                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                     onClick={() => handleModelSelect(model)}
                   >
                     <div className="font-medium">{model.nome}</div>
                     <div className="text-sm text-gray-500">
                       R$ {model.valor_fipe.toLocaleString('pt-BR')}
                     </div>
                   </div>
                 ))}
             </div>
           )}
         </div>

        {/* Ano */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ano *
          </label>
          <input
            type="number"
            name="ano"
            value={formData.ano}
            onChange={handleInputChange}
            min="1900"
            max={new Date().getFullYear() + 1}
            className="input-field"
            placeholder="Ex: 2023"
            required
          />
        </div>

        {/* Combustível */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Combustível *
          </label>
          <select
            name="combustivel"
            value={formData.combustivel}
            onChange={handleInputChange}
            className="input-field"
            required
          >
            <option value="">Selecione o combustível</option>
            <option value="gasolina">Gasolina</option>
            <option value="etanol">Etanol</option>
            <option value="flex">Flex</option>
            <option value="diesel">Diesel</option>
            <option value="eletrico">Elétrico</option>
            <option value="hibrido">Híbrido</option>
          </select>
        </div>

        {/* Número de Portas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de Portas *
          </label>
          <select
            name="num_portas"
            value={formData.num_portas}
            onChange={handleInputChange}
            className="input-field"
            required
          >
            <option value="">Selecione o número de portas</option>
            <option value="2">2 portas</option>
            <option value="3">3 portas</option>
            <option value="4">4 portas</option>
            <option value="5">5 portas</option>
          </select>
        </div>

        {/* Cor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cor *
          </label>
          <input
            type="text"
            name="cor"
            value={formData.cor}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Ex: Branco, Preto, Prata..."
            required
          />
        </div>

        {/* Botões */}
        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Cadastrando...
              </span>
            ) : (
              'Cadastrar Carro'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCar
