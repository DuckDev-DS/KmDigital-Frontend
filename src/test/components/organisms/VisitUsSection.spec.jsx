import React from 'react'
import { render, screen } from '@testing-library/react'

describe('VisitUsSection Component', () => {
  let VisitUsSection

  beforeEach(() => {
    const hookPath = require.resolve('../../../hooks/VisitUsData.js')
    delete require.cache[hookPath]

    require.cache[hookPath] = {
      exports: {
        useVisitUsData: () => ({
          sucursal: null,
          loading: false,
          error: false,
        }),
      },
    }

    VisitUsSection = require('../../../components/organisms/VisitUsSection').default
  })

  it('muestra el título "Visítanos"', () => {
    render(<VisitUsSection />)
    expect(screen.getByText('Visítanos')).toBeTruthy()
  })
})
