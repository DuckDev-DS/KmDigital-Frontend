import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense } from 'react'

import Navbar from './components/organisms/Navbar.jsx'
import Footer from './components/organisms/Footer.jsx'

import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { useAuth } from './context/useAuth.jsx'
import { appRoutes } from './routes/config.jsx'

function AppRoutes() {
  const { isAdmin } = useAuth()

  return (
    <Container className="mt-4 mb-4">
      <Suspense
        fallback={
          <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        }
      >
        <Routes>
          {appRoutes.map(({ path, element, isAdmin: adminOnly }) => (
            <Route
              key={path}
              path={path}
              element={
                adminOnly && !isAdmin ? <Navigate to="/" replace /> : element
              }
            />
          ))}
        </Routes>
      </Suspense>
    </Container>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <AppRoutes />
        <Footer />
      </CartProvider>
    </AuthProvider>
  )
}

export default App
