import React from 'react'
import { render, screen } from '@testing-library/react'
import FilterPanel from '../../../components/organisms/FilterPanel'

describe('FilterPanel Component', () => {
  it('muestra el título "Filtros"', () => {
    render(
      <FilterPanel
        marcas={[]}
        paises={[]}
        filters={{ texto: '', marcaId: '', paisId: '', precioMin: '', precioMax: '' }}
        onChange={() => {}}
        onClear={() => {}}
      />
    )

    expect(screen.getByText('Filtros')).toBeTruthy()
  })
})
