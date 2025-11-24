import React from 'react'
import { render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

describe('Navbar Component', () => {
  let Navbar

  beforeEach(() => {
    const authPath = require.resolve('../../../context/useAuth.jsx')
    delete require.cache[authPath]
    require.cache[authPath] = {
      exports: {
        useAuth: () => ({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          logout: jasmine.createSpy('logout'),
        }),
      },
    }

    const cartPath = require.resolve('../../../context/useCart.jsx')
    delete require.cache[cartPath]
    require.cache[cartPath] = {
      exports: {
        useCart: () => ({
          cart: [],
        }),
      },
    }

    Navbar = require('../../../components/organisms/Navbar').default
  })

  it('muestra el enlace "Inicio"', () => {
    const router = createMemoryRouter(
      [{ path: '/', element: <Navbar /> }],
      { initialEntries: ['/'] }
    )

    render(<RouterProvider router={router} />)

    expect(screen.getByText('Inicio')).toBeTruthy()
  })
})
