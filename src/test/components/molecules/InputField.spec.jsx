import React from 'react'
import { render, screen } from '@testing-library/react'
import InputField from '../../../components/molecules/InputField'

describe('InputField Component', () => {
  it('muestra el label correctamente', () => {
    render(
      <InputField
        label="Nombre"
        value=""
        onChange={() => {}}
        placeholder="Ingresa tu nombre"
      />
    )

    expect(screen.getByText('Nombre')).toBeTruthy()
  })
})
