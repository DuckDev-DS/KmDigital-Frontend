import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('RegisterForm Component', () => {
  let RegisterForm

  beforeEach(() => {
    // Mock de useAuth ANTES de requerir el componente
    const authPath = require.resolve('../../../context/useAuth.jsx')
    delete require.cache[authPath]
    require.cache[authPath] = {
      exports: {
        useAuth: () => ({
          register: jasmine.createSpy('register').and.returnValue(
            Promise.resolve({ ok: true, message: '' })
          ),
          authLoading: false,
        }),
      },
    }

    // Mock de ComunasService para evitar llamadas reales
    const comunasPath = require.resolve('../../../services/ComunasService.jsx')
    delete require.cache[comunasPath]
    require.cache[comunasPath] = {
      exports: {
        default: {
          getAll: jasmine.createSpy('getAll').and.returnValue(
            Promise.resolve([])
          ),
        },
      },
    }

    // Ahora sí requerimos el componente
    RegisterForm =
      require('../../../components/molecules/RegisterForm.jsx').default
  })

  it('muestra el label "Nombre completo"', () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    )

    expect(screen.getByText('Nombre completo')).toBeTruthy()
  })
})
