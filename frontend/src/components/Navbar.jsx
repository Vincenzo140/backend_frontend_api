import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-dark rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🚗</span>
            </div>
            <span className="text-xl font-bold text-gray-hot">Car Manager</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className="text-gray-hot hover:text-purple-dark px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Início
            </Link>
            <Link 
              to="/add-car" 
              className="btn-primary text-sm"
            >
              Adicionar Carro
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
