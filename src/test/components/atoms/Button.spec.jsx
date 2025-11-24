import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from '../../../components/atoms/Button'

describe('Button Component', () => {
  it('renderiza el texto del botón correctamente', () => {
    render(<Button>Click aquí</Button>)
    expect(screen.getByText('Click aquí')).toBeTruthy()
  })
})