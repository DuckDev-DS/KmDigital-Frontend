import React, { useState } from 'react'
import HeroWithForm from '../components/organisms/HeroWithForm.jsx'
import IconGridSection from '../components/organisms/IconGridSection.jsx'
import VisitUsSection from '../components/organisms/VisitUsSection.jsx'
import { MARCAS } from '../datos/marcas.js'
import { ANIOS } from '../datos/anios.js'

function Home() {
  const [selectedBrandId, setSelectedBrandId] = useState('')

  const [heroFilters, setHeroFilters] = useState({
    texto: '',
    marcaId: '',
    anioMin: '',
  })

  const handleHeroChange = (key, value) => {
    setHeroFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleHeroSubmit = (values) => {
    console.log('Filtros desde Hero (visual):', values)
  }

  const handleBrandSelect = (id, item) => {
    setSelectedBrandId((prev) => (prev === id ? '' : id))
    console.log('Marca seleccionada (visual):', id, item)
  }

  const heroFields = [
    {
      key: 'texto',
      label: '¿Qué estás buscando?',
      type: 'text',
      placeholder: 'Ej: SUV, Toyota, automático...',
      colSize: 12,
    },
    {
      key: 'marcaId',
      label: 'Marca',
      type: 'select',
      options: MARCAS,
      placeholder: 'Todas',
      colSize: 6,
    },
    {
      key: 'anioMin',
      label: 'Año mínimo',
      type: 'select',
      options: ANIOS,
      placeholder: 'Cualquiera',
      colSize: 6,
    },
  ]

  return (
    <div>
      <HeroWithForm
        title="Encuentra aquí tu auto"
        subtitle="Explora nuestro catálogo de vehículos, filtra por marca, año y más. Haz que tu próxima compra sea más fácil con KM Digital."
        fields={heroFields}
        values={heroFilters}
        onChange={handleHeroChange}
        onSubmit={handleHeroSubmit}
        submitLabel="Buscar vehículos"
      />

      <IconGridSection
        title="Filtrar por marca"
        subtitle="Elige una marca para ver vehículos disponibles."
        items={MARCAS}
        selectedId={selectedBrandId}
        onSelect={handleBrandSelect}
      />

      <VisitUsSection />
    </div>
  )
}

export default Home
