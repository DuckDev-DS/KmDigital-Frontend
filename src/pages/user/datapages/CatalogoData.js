import { useEffect, useState } from 'react'
import VehiculosService from '../../../services/VehiculosService.jsx'
import MarcasService from '../../../services/MarcasService.jsx'

/**
 * Helpers basados en tu estructura:
 * - La marca viene desde el modelo: vehiculo.modelo.marca
 */

function getMarcaFromVehiculo(v) {
  // marca principal: viene desde el modelo
  if (v.modelo && v.modelo.marca) {
    return v.modelo.marca
  }

  // fallback por si acaso en algún caso viene directo
  if (v.marca) {
    return v.marca
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

function getPaisNombre(v) {
  if (!v.pais) return ''
  if (typeof v.pais === 'string') return v.pais
  return v.pais.nombre || ''
}

export const useCatalogoData = () => {
  const [vehiculos, setVehiculos] = useState([])
  const [filteredVehiculos, setFilteredVehiculos] = useState([])

  const [marcas, setMarcas] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [filters, setFilters] = useState({
    texto: '',
    marcaId: '',
    precioMin: '',
    precioMax: '',
  })

  // Cargar vehículos y marcas
  useEffect(() => {
    const load = async () => {
      try {
        const [vehData, marcasData] = await Promise.all([
          VehiculosService.getAll(),
          MarcasService.getAll(),
        ])

        const lista = Array.isArray(vehData) ? vehData : []
        setVehiculos(lista)
        setFilteredVehiculos(lista)

        setMarcas(Array.isArray(marcasData) ? marcasData : [])
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

    // 🔍 Filtro por texto: marca, modelo, país, año
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

    // 🏷️ Filtro por marca (marca viene desde v.modelo.marca)
    if (filters.marcaId) {
      const marcaIdNum = Number(filters.marcaId)

      lista = lista.filter((v) => {
        const marca = getMarcaFromVehiculo(v)

        // Caso típico: marca es objeto con id
        if (marca && typeof marca === 'object' && marca.id != null) {
          return Number(marca.id) === marcaIdNum
        }

        // Fallback: por si tienes v.marcaId como campo suelto
        if (v.marcaId && Number(v.marcaId) === marcaIdNum) {
          return true
        }

        return false
      })
    }

    // 💰 Filtros de precio
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
      precioMin: '',
      precioMax: '',
    })
  }

  return {
    vehiculos,
    filteredVehiculos,
    marcas,
    loading,
    error,
    filters,
    handleFilterChange,
    clearFilters,
  }
}
