import React from 'react'
import { render } from '@testing-library/react'
import HomeAdmin from '../../../pages/admin/HomeAdmin.jsx'

describe('HomeAdmin Page', () => {
  it('se renderiza sin errores y muestra contenedores', () => {
    const { container } = render(<HomeAdmin />)

    // HomeAdmin envuelve cada EntityCrudPanel en un div.container.my-5
    const containers = container.querySelectorAll('.container.my-5')
    expect(containers.length).toBeGreaterThan(0)
  })
})
