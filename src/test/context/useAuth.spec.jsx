import React from 'react'
import { render } from '@testing-library/react'
import { useAuth } from '../../context/useAuth.jsx'
import { AuthContext } from '../../context/AuthContextValue.js'

// Componente dummy para ejecutar el hook
function TestComponent() {
  useAuth()
  return <div>OK</div>
}

describe('useAuth Hook', () => {
  it('lanza error si se usa fuera de un AuthProvider', () => {
    expect(() => render(<TestComponent />)).toThrowError(
      'useAuth debe usarse dentro de un AuthProvider'
    )
  })
})
