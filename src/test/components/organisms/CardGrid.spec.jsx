import React from 'react'
import { render, screen } from '@testing-library/react'
import CardGrid from '../../../components/organisms/CardGrid'

describe('CardGrid Component', () => {
  it('muestra el texto de carga cuando loading es true', () => {
    render(<CardGrid loading={true} error={null} items={[]} />)

    expect(screen.getByText('Cargando resultados...')).toBeTruthy()
  })
})
