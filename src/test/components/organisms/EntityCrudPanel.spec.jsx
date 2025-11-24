import React from 'react'
import { render, screen } from '@testing-library/react'
import EntityCrudPanel from '../../../components/organisms/EntityCrudPanel'

describe('EntityCrudPanel Component', () => {
  it('muestra el título del panel desde dataConfig', () => {
    const mockDataConfig = [
      {}, // índice 0 no se usa
      {
        title: 'Gestión de Marcas',
        columns: ['id', 'nombre'],
      },
    ]

    const mockService = {
      getAll: jasmine.createSpy('getAll').and.returnValue(Promise.resolve([])),
      create: jasmine.createSpy('create'),
      update: jasmine.createSpy('update'),
      delete: jasmine.createSpy('delete'),
    }

    render(
      <EntityCrudPanel
        dataConfig={mockDataConfig}
        inputsConfig={[]}
        service={mockService}
      />
    )

    expect(screen.getByText('Gestión de Marcas')).toBeTruthy()
  })
})
