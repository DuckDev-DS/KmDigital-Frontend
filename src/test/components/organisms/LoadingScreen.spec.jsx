import React from 'react'
import { render, screen } from '@testing-library/react'
import IconGridSection from '../../../components/organisms/IconGridSection'

describe('IconGridSection Component', () => {
  it('muestra el título correctamente', () => {
    render(
      <IconGridSection
        title="Filtrar por marca"
        subtitle="Selecciona una marca"
        items={[]}
      />
    )

    expect(screen.getByText('Filtrar por marca')).toBeTruthy()
  })
})
