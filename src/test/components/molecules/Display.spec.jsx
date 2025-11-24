import React from 'react'
import { render, screen } from '@testing-library/react'
import Display from '../../../components/molecules/Display'

describe('Display Component', () => {
  it('muestra el título correctamente', () => {
    render(<Display title="Vehículos" subtitle="Encuentra el tuyo" />)
    expect(screen.getByText('Vehículos')).toBeTruthy()
  })
})
