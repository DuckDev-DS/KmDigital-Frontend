import React from 'react'
import { render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import VehicleCard from '../../../components/molecules/VehicleCard'

describe('VehicleCard Component', () => {
  it('renderiza el título del vehículo correctamente', () => {
    const mockVehiculo = {
      id: 1,
      nombre: 'Toyota Corolla',
      modelo: { nombre: 'Corolla' },
      anio: 2020,
      precio: 9000000,
      kilometraje: 15000,
      estadoVenta: 'Disponible',
      imagenAuto: 'test.jpg'
    }

    const router = createMemoryRouter(
      [{ path: '*', element: <VehicleCard vehiculo={mockVehiculo} /> }],
      { initialEntries: ['/'] }
    )

    render(<RouterProvider router={router} />)

    expect(screen.getByText('Toyota Corolla')).toBeTruthy()
  })
})
