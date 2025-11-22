import React from 'react'
import { Navbar as RBNavbar, Container, Nav } from 'react-bootstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'

import '../../styles/components/organisms/Navbar.css'

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const { cart } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/') 
  }

  return (
    <RBNavbar expand="lg" className="km-navbar">
      <Container>

        <RBNavbar.Brand as={Link} to="/" className="km-navbar-brand">
          KM Digital
        </RBNavbar.Brand>

        <RBNavbar.Toggle
          aria-controls="km-navbar-nav"
          className="km-navbar-toggle"
        />

        <RBNavbar.Collapse id="km-navbar-nav" className="justify-content-end">
          <Nav className="km-navbar-links">

            <Nav.Link
              as={NavLink}
              to="/"
              end
              className="km-nav-link km-nav-link-btn"
            >
              Inicio
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/catalogo"
              className="km-nav-link km-nav-link-btn"
            >
              Catálogo
            </Nav.Link>

            {/* 🛒 Carrito */}
            <Nav.Link
              as={NavLink}
              to="/carrito"
              className="km-nav-link km-nav-link-btn km-navbar-cart"
            >
              <span className="km-navbar-cart-icon">🛒</span>
              {cart.length > 0 && (
                <span className="km-navbar-cart-badge">
                  {cart.length}
                </span>
              )}
            </Nav.Link>

            {!isAuthenticated && (
              <Nav.Link
                as={NavLink}
                to="/login"
                className="km-nav-link km-nav-link-btn km-nav-link-login"
              >
                Iniciar sesión
              </Nav.Link>
            )}

            {isAuthenticated && (
              <>
                <span className="km-navbar-username">
                  Hola, {user?.nombre || 'Usuario'}
                </span>

                <button
                  className="km-navbar-logout-btn"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </>
            )}

          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  )
}

export default Navbar
