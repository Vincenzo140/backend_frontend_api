import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddCar from './pages/AddCar'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-gray-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-car" element={<AddCar />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
