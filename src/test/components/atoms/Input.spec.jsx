import React from 'react'
import { render, screen } from '@testing-library/react'
import Input from '../../../components/atoms/Input'

describe('Input Component', () => {
  it('renderiza el placeholder correctamente', () => {
    render(<Input placeholder="Ingresa tu nombre" />)
    expect(screen.getByPlaceholderText('Ingresa tu nombre')).toBeTruthy()
  })
})
