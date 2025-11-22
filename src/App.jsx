import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'

import { vanish } from './hooks/Vanish.js'
import LoadingScreen from './components/organisms/LoadingScreen.jsx'
import Navbar from './components/organisms/Navbar.jsx'
import Home from './pages/user/pages2/Home.jsx'

import Ingresar from './pages/Auth/Login.jsx'
import Registrar from './pages/Auth/Register.jsx'
import Catalogo from './pages/user/pages2/Catalogo.jsx'

import { AuthProvider } from './context/AuthContext.jsx'

function App() {
  // Se pone en true cuando el Home terminó de cargar las APIs
  const [ready, setReady] = useState(false)

  // vanish ahora espera a que "ready" sea true para iniciar el fade
  const { showSplash, fadeOut } = vanish(1200, 500, ready)

  return (
    <AuthProvider>
      {showSplash && <LoadingScreen fadeOut={fadeOut} />}

      <Navbar />
      <Container className="mt-4 mb-4">
        <Routes>
          <Route path="/" element={<Home onReady={() => setReady(true)} />} />
          <Route path="/login" element={<Ingresar />} />
          <Route path="/register" element={<Registrar />} />
          <Route path="/catalogo" element={<Catalogo />} />
          {/* aquí irán más rutas después */}
        </Routes>
      </Container>
    </AuthProvider>
  )
}

export default App
