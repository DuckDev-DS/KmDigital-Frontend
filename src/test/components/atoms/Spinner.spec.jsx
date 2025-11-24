import React from 'react'
import { render, screen } from '@testing-library/react'
import Spinner from '../../../components/atoms/Spinner'

describe('Spinner Component', () => {
  it('renderiza el texto de carga correctamente', () => {
    render(<Spinner />)
    expect(screen.getByText('Cargando...')).toBeTruthy()
  })
})
