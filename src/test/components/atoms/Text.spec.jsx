import React from 'react'
import { render, screen } from '@testing-library/react'
import Text from '../../../components/atoms/Text'

describe('Text Component', () => {
  it('renderiza el contenido correctamente', () => {
    render(<Text>Hola Mundo</Text>)
    expect(screen.getByText('Hola Mundo')).toBeTruthy()
  })
})
