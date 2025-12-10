import React from 'react'
import { render } from '@testing-library/react'
import { useCart } from '../../context/useCart.jsx'
import { CartContext } from '../../context/CartContextValue.js'

// Componente dummy para invocar el hook
function TestComponent() {
  useCart()
  return <div>OK</div>
}

describe('useCart Hook', () => {
  it('lanza error si se usa fuera de un CartProvider', () => {
    expect(() => render(<TestComponent />)).toThrowError(
      'useCart debe usarse dentro de un CartProvider'
    )
  })
})
