import React from 'react'
import { render, screen } from '@testing-library/react'
import HeroWithForm from '../../../components/organisms/HeroWithForm'

describe('HeroWithForm Component', () => {
  it('muestra el título correctamente', () => {
    render(
      <HeroWithForm
        title="Encuentra tu próximo vehículo"
        subtitle="Filtra según tus preferencias"
        fields={[]}
        values={{}}
        onChange={() => {}}
        onSubmit={() => {}}
      />
    )

    expect(screen.getByText('Encuentra tu próximo vehículo')).toBeTruthy()
  })
})
