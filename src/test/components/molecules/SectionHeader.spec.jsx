import React from 'react'
import { render, screen } from '@testing-library/react'
import SectionHeader from '../../../components/molecules/SectionHeader'

describe('SectionHeader Component', () => {
  it('renderiza el título correctamente', () => {
    render(
      <SectionHeader
        title="Vehículos Disponibles"
        subtitle="Encuentra el tuyo"
      />
    )

    expect(screen.getByText('Vehículos Disponibles')).toBeTruthy()
  })
})
