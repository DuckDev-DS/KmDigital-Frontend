import React from 'react'
import { render, screen } from '@testing-library/react'
import EntityTable from '../../../components/organisms/EntityTable'

describe('EntityTable Component', () => {

  it('muestra el título correctamente', () => {
    const mockColumns = ['id', 'nombre', 'acciones']
    const mockData = [
      { id: 1, nombre: 'Toyota' }
    ]

    render(
      <EntityTable
        title="Listado de Marcas"
        columns={mockColumns}
        data={mockData}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    )

    expect(screen.getByText('Listado de Marcas')).toBeTruthy()
  })
})
