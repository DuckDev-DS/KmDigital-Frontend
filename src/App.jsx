import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/organisms/Navbar.jsx'
import Home from './pages/user/pages2/Home.jsx'

import Ingresar from './pages/Auth/Login.jsx'
import Registrar from './pages/Auth/Register.jsx'
import Catalogo from './pages/user/pages2/Catalogo.jsx'
import DetalleVehiculo from './pages/user/pages2/DetalleVehiculo.jsx'
import Carrito from './pages/user/pages2/Carrito.jsx'
import Footer from './components/organisms/Footer.jsx'


import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <Container className="mt-4 mb-4">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Ingresar />} />
            <Route path="/register" element={<Registrar />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/vehiculo/:id" element={<DetalleVehiculo />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
        </Container>
        <Footer />
      </CartProvider>
    </AuthProvider>
  )
}

export default App
