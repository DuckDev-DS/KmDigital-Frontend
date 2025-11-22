import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import VehiculosService from '../../../services/VehiculosService.jsx'
import MarcasService from '../../../services/MarcasService.jsx'
import PaisOrigenService from '../../../services/PaisOrigenService.jsx'

function getMarcaFromVehiculo(v) {
  if (v.modelo && v.modelo.marca) return v.modelo.marca
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

function getPaisFromVehiculo(v) {
  return v.paisOrigen || null
}

function getPaisNombre(v) {
  const pais = getPaisFromVehiculo(v)
  if (!pais) return ''
  if (typeof pais === 'string') return pais
  return pais.nombre || ''
}

export const useCatalogoData = () => {
  const location = useLocation()

  const marcaIdFromState = location.state?.marcaId ?? ''
  const paisIdFromState = location.state?.paisId ?? ''

  const [vehiculos, setVehiculos] = useState([])
  const [filteredVehiculos, setFilteredVehiculos] = useState([])

  const [marcas, setMarcas] = useState([])
  const [paises, setPaises] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [filters, setFilters] = useState({
    texto: '',
    marcaId: marcaIdFromState ? String(marcaIdFromState) : '',
    paisId: paisIdFromState ? String(paisIdFromState) : '',
    precioMin: '',
    precioMax: '',
  })

  // Cargar vehículos, marcas y países
  useEffect(() => {
    const load = async () => {
      try {
        const [vehData, marcasData, paisesData] = await Promise.all([
          VehiculosService.getAll(),
          MarcasService.getAll(),
          PaisOrigenService.getAll(),
        ])

        const lista = Array.isArray(vehData) ? vehData : []
        setVehiculos(lista)
        setFilteredVehiculos(lista)

        setMarcas(Array.isArray(marcasData) ? marcasData : [])
        setPaises(Array.isArray(paisesData) ? paisesData : [])
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

    // Texto libre: marca, modelo, país, año
    if (filters.texto.trim() !== '') {
      const q = filters.texto.toLowerCase()

      lista = lista.filter((v) => {
        const marcaNombre = getMarcaNombre(v).toLowerCase()
        const modeloNombre = getModeloNombre(v).toLowerCase()
        const paisNombre = getPaisNombre(v).toLowerCase()
        const anioText = String(v.anio || v.year || '').toLowerCase()

        return (
          marcaNombre.includes(q) ||
          modeloNombre.includes(q) ||
          paisNombre.includes(q) ||
          anioText.includes(q)
        )
      })
    }

    // Filtro por marca (id)
    if (filters.marcaId) {
      const marcaIdNum = Number(filters.marcaId)
      lista = lista.filter((v) => {
        const marca = getMarcaFromVehiculo(v)
        if (marca && typeof marca === 'object' && marca.id != null) {
          return Number(marca.id) === marcaIdNum
        }
        return false
      })
    }

    // Filtro por país (id)
    if (filters.paisId) {
      const paisIdNum = Number(filters.paisId)
      lista = lista.filter((v) => {
        const pais = getPaisFromVehiculo(v)
        if (pais && typeof pais === 'object' && pais.id != null) {
          return Number(pais.id) === paisIdNum
        }
        return false
      })
    }

    // Precio
    const min = filters.precioMin ? Number(filters.precioMin) : null
    const max = filters.precioMax ? Number(filters.precioMax) : null

    if (min !== null && !Number.isNaN(min)) {
      lista = lista.filter((v) => Number(v.precio || 0) >= min)
    }

    if (max !== null && !Number.isNaN(max)) {
      lista = lista.filter((v) => Number(v.precio || 0) <= max)
    }

    setFilteredVehiculos(lista)
  }, [filters, vehiculos])

  const handleFilterChange = (key, value) => {
    let newValue = value

    if (key === 'precioMin' || key === 'precioMax') {
      const num = Number(value)
      newValue = Number.isNaN(num) || num < 0 ? '' : String(num)
    }

    setFilters((prev) => ({
      ...prev,
      [key]: newValue,
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
