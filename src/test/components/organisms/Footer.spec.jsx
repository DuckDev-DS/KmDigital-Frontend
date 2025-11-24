import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Footer Component', () => {
  let Footer

  beforeEach(() => {
    const hookPath = require.resolve('../../../hooks/VisitUsData')
    delete require.cache[hookPath]

    require.cache[hookPath] = {
      exports: {
        useVisitUsData: () => ({
          sucursal: null,
          sucursales: [],
        }),
      },
    }


    Footer = require('../../../components/organisms/Footer').default
  })

  it('muestra el nombre "KM Digital Automotores" cuando no hay sucursales', () => {
    render(<Footer />)
    expect(screen.getByText('KM Digital Automotores')).toBeTruthy()
  })
})
