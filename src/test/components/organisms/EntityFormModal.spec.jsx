import React from 'react'
import { render, screen } from '@testing-library/react'
import EntityFormModal from '../../../components/organisms/EntityFormModal'

describe('EntityFormModal Component', () => {
  it('muestra el título "Formulario" cuando está abierto', () => {
    render(
      <EntityFormModal
        isOpen={true}
        onSubmit={() => {}}
        inputsConfig={[]}   // sin campos para simplificar la prueba
        initialData={{}}
        editingId={null}
      />
    )

    expect(screen.getByText('Formulario')).toBeTruthy()
  })
})
