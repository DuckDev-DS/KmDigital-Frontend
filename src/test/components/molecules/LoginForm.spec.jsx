import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('LoginForm Component', () => {
  let LoginForm

  beforeEach(() => {
    // Mock de useAuth ANTES de requerir el componente
    const authPath = require.resolve('../../../context/useAuth.jsx')
    delete require.cache[authPath]
    require.cache[authPath] = {
      exports: {
        useAuth: () => ({
          login: jasmine.createSpy('login').and.returnValue(
            Promise.resolve({ ok: true, message: '' })
          ),
          authLoading: false,
        }),
      },
    }

    // Ahora sí requerimos el componente, que usará el mock de arriba
    LoginForm = require('../../../components/molecules/LoginForm.jsx').default
  })

  it('muestra el label "Correo electrónico"', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )

    expect(screen.getByText('Correo electrónico')).toBeTruthy()
  })
})
