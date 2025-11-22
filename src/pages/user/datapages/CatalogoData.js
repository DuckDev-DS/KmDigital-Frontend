import { useEffect, useState } from 'react'
import VehiculosService from '../../../services/VehiculosService.jsx'

function getMarcaFromVehiculo(v) {
  if (v.modelo && v.modelo.marca) {
    return v.modelo.marca
  }
  return null
}

function getMarcaNombre(v) {
  const marca = getMarcaFromVehiculo(v)
  if (!marca) return ''
  if (typeof marca === 'string') return marca
  return marca.nombre || ''
}

function getModeloNombre(v) {
  if (!v.modelo) return ''
  if (typeof v.modelo === 'string') return v.modelo
  return v.modelo.nombre || ''
}

// PAÍS DE ORIGEN 
function getPaisFromVehiculo(v) {
  // soporta paisOrigen o PaisOrigen
  return v.paisOrigen || v.PaisOrigen || null
}

function getPaisNombre(v) {
  const pais = getPaisFromVehiculo(v)
  if (!pais) return ''
  if (typeof pais === 'string') return pais
  return pais.nombre || ''
}

// HOOK PRINCIPAL
export const useCatalogoData = (initialFilters = {}) => {
  const [vehiculos, setVehiculos] = useState([])
  const [filteredVehiculos, setFilteredVehiculos] = useState([])

  const [marcas, setMarcas] = useState([])
  const [paises, setPaises] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [filters, setFilters] = useState(() => ({
    texto: '',
    marcaId: initialFilters.marcaId || '',
    paisId: initialFilters.paisId || '',
    precioMin: '',
    precioMax: '',
  }))

  // Cargar vehículos → derivar marcas y países
  useEffect(() => {
    const load = async () => {
      try {
        const vehData = await VehiculosService.getAll()
        const lista = Array.isArray(vehData) ? vehData : []

        setVehiculos(lista)
        setFilteredVehiculos(lista)

        const marcasSet = new Set()
        const marcasUnicas = []

        const paisesSet = new Set()
        const paisesUnicos = []

        lista.forEach((v) => {
          // marcas
          const marca = getMarcaFromVehiculo(v)
          if (marca && !marcasSet.has(marca.id)) {
            marcasSet.add(marca.id)
            marcasUnicas.push(marca)
          }

          // países
          const pais = getPaisFromVehiculo(v)
          if (pais && !paisesSet.has(pais.id)) {
            paisesSet.add(pais.id)
            paisesUnicos.push(pais)
          }
        })

        setMarcas(marcasUnicas)
        setPaises(paisesUnicos)
      } catch (err) {
        console.error('Error cargando catálogo:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  // Aplicar filtros
  useEffect(() => {
    let lista = [...vehiculos]

    // Búsqueda general
    if (filters.texto.trim() !== '') {
      const q = filters.texto.toLowerCase()

      lista = lista.filter((v) => {
        const marcaNombre = getMarcaNombre(v).toLowerCase()
        const modeloNombre = getModeloNombre(v).toLowerCase()
        const paisNombre = getPaisNombre(v).toLowerCase()
        const anioText = String(v.anio || '').toLowerCase()

        return (
          marcaNombre.includes(q) ||
          modeloNombre.includes(q) ||
          paisNombre.includes(q) ||
          anioText.includes(q)
        )
      })
    }

    // FILTRO POR PAÍS 
    if (filters.paisId) {
      lista = lista.filter((v) => {
        const pais = getPaisFromVehiculo(v)
        return pais && String(pais.id) === String(filters.paisId)
      })
    }

    // FILTRO POR MARCA
    if (filters.marcaId) {
      lista = lista.filter(
        (v) =>
          v.modelo &&
          v.modelo.marca &&
          String(v.modelo.marca.id) === String(filters.marcaId)
      )
    }

    // FILTRO POR PRECIO
    const min = filters.precioMin !== '' ? Number(filters.precioMin) : null
    const max = filters.precioMax !== '' ? Number(filters.precioMax) : null

    if (min !== null && !Number.isNaN(min)) {
      lista = lista.filter((v) => Number(v.precio || 0) >= min)
    }

    if (max !== null && !Number.isNaN(max)) {
      lista = lista.filter((v) => Number(v.precio || 0) <= max)
    }

    setFilteredVehiculos(lista)
  }, [filters, vehiculos])

  const handleFilterChange = (key, value) => {
    let val = value

    if (key === 'precioMin' || key === 'precioMax') {
      const num = Number(value)
      val = Number.isNaN(num) || num < 0 ? '' : String(num)
    }

    setFilters((prev) => ({
      ...prev,
      [key]: val,
    }))
  }

  const clearFilters = () => {
    setFilters({
      texto: '',
      marcaId: '',
      paisId: '',
      precioMin: '',
      precioMax: '',
    })
  }

  return {
    vehiculos,
    filteredVehiculos,
    marcas,
    paises,
    loading,
    error,
    filters,
    handleFilterChange,
    clearFilters,
  }
}
