import React from 'react'
import { render, screen } from '@testing-library/react'
import SearchField from '../../../components/molecules/SearchField'

describe('SearchField Component', () => {
  it('renderiza el placeholder correctamente', () => {
    render(
      <SearchField
        value=""
        onChange={() => {}}
        onSearch={() => {}}
        placeholder="Buscar vehículo..."
      />
    )

    expect(screen.getByPlaceholderText('Buscar vehículo...')).toBeTruthy()
  })
})
