import React from 'react'
import { render, screen } from '@testing-library/react'
import SelectField from '../../../components/molecules/SelectField'

describe('SelectField Component', () => {
  it('muestra el label correctamente', () => {
    render(
      <SelectField
        label="Tipo de vehículo"
        value=""
        onChange={() => {}}
        options={[]}
      />
    )

    expect(screen.getByText('Tipo de vehículo')).toBeTruthy()
  })
})
