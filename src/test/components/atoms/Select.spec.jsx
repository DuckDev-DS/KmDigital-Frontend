import React from 'react'
import { render, screen } from '@testing-library/react'
import Select from '../../../components/atoms/Select'

describe('Select Component', () => {
  it('renderiza las opciones correctamente', () => {
    render(
      <Select value="1" onChange={() => {}}>
        <option value="1">Opción 1</option>
        <option value="2">Opción 2</option>
      </Select>
    )

    expect(screen.getByText('Opción 1')).toBeTruthy()
    expect(screen.getByText('Opción 2')).toBeTruthy()
  })
})
