import React from 'react'
import { Navbar as RBNavbar, Container, Nav } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'

import '../../styles/components/organisms/Navbar.css'

function Navbar() {
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

            <Nav.Link
              as={NavLink}
              to="/contacto"
              className="km-nav-link km-nav-link-btn"
            >
              Contáctanos
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/login"
              className="km-nav-link km-nav-link-btn km-nav-link-login"
            >
              Iniciar sesión
            </Nav.Link>

          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  )
}

export default Navbar
