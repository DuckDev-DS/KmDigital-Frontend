import React, { useState, useEffect } from 'react'
import HeroWithForm from '../components/organisms/HeroWithForm.jsx'
import IconGridSection from '../components/organisms/IconGridSection.jsx'
import VisitUsSection from '../components/organisms/VisitUsSection.jsx'
import MarcasService from '../services/MarcasService.jsx'
import VehiculosService from '../services/VehiculosService.jsx'

function Home() {
  const [marcas, setMarcas] = useState([])
  const [loadingMarcas, setLoadingMarcas] = useState(true)
  const [errorMarcas, setErrorMarcas] = useState(false)

  const [selectedBrandId, setSelectedBrandId] = useState('')

  const [heroFilters, setHeroFilters] = useState({
    texto: '',
    marcaId: '',
    precioMin: '',
    precioMax: '',
  })

  // const [vehiculos, setVehiculos] = useState([])

  useEffect(() => {
    const loadMarcas = async () => {
      try {
        const data = await MarcasService.getAll()
        setMarcas(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error cargando marcas desde backend:', error)
        setErrorMarcas(true)
      } finally {
        setLoadingMarcas(false)
      }
    }

    loadMarcas()
  }, [])

  const handleHeroChange = (key, value) => {
    let newValue = value

    if (key === 'precioMin' || key === 'precioMax') {
      const num = Number(value)
      if (Number.isNaN(num) || num < 0) {
        newValue = '0'
      } else {
        newValue = String(num)
      }
    }

    setHeroFilters((prev) => ({
      ...prev,
      [key]: newValue,
    }))
  }

  const filtrarPorPrecio = async (precioMin, precioMax) => {
    try {
      if (!precioMin || !precioMax) {
        console.warn('Para filtrar por precio se necesitan ambos valores.')
        return
      }

      const data = await VehiculosService.getByRangoPrecio(precioMin, precioMax)
      console.log('Vehículos filtrados por precio:', data)

      // setVehiculos(data)
    } catch (error) {
      console.error(
        `Error al filtrar vehículos por precio entre ${precioMin} y ${precioMax}:`,
        error
      )
    }
  }

  const handleHeroSubmit = async (values) => {
    console.log('Filtros enviados desde el Hero:', values)

    const { precioMin, precioMax } = values
    await filtrarPorPrecio(precioMin, precioMax)
  }

  const handleBrandSelect = (id, item) => {
    setSelectedBrandId((prev) => (String(prev) === String(id) ? '' : id))

    setHeroFilters((prev) => ({
      ...prev,
      marcaId: String(prev.marcaId) === String(id) ? '' : id,
    }))

    console.log('Marca seleccionada:', id, item)
  }

  const heroFields = [
    {
      key: 'texto',
      label: '¿Qué buscas?',
      type: 'text',
      placeholder: 'Ej: SUV, Toyota, automático...',
      colSize: 12,
    },
    {
      key: 'precioMin',
      label: 'Precio mínimo',
      type: 'number',
      placeholder: 'Ej: 5000000',
      colSize: 6,
      min: 0,
    },
    {
      key: 'precioMax',
      label: 'Precio máximo',
      type: 'number',
      placeholder: 'Ej: 15000000',
      colSize: 6,
      min: 0,
    },
    {
      key: 'marcaId',
      label: 'Marca',
      type: 'select',
      options: marcas,
      optionLabel: 'nombre',
      optionValue: 'id',
      placeholder: 'Seleccione una marca',
      colSize: 6,
    },
  ]

  return (
    <div>
      <HeroWithForm
        title="Encuentra aquí tu auto"
        subtitle="Filtra por marca y rango de precio para encontrar el vehículo que necesitas."
        fields={heroFields}
        values={heroFilters}
        onChange={handleHeroChange}
        onSubmit={handleHeroSubmit}
        submitLabel="Buscar vehículos"
      />

      {loadingMarcas ? (
        <p className="text-center mt-4">Cargando marcas...</p>
      ) : errorMarcas ? (
        <p className="text-center text-danger">
          No se pudieron cargar las marcas desde el servidor.
        </p>
      ) : (
        <IconGridSection
          title="Conoce las marcas que están en KM Digital"
          subtitle="Selecciona una marca para explorar vehículos disponibles."
          items={marcas}
          selectedId={selectedBrandId}
          onSelect={handleBrandSelect}
          getKey={(m) => m.id}
          getLabel={(m) => m.nombre}
          getImage={(m) => m.imagenMarca}
          showFilter={true}
        />
      )}

      <VisitUsSection />
    </div>
  )
}

export default Home
