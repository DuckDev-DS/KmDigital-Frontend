import { useEffect, useState } from 'react'
import SucursalesService from '../services/SucursalesService'

export function useVisitUsData() {
  // sucursal mantiene la sucursal principal (la primera),
  // sucursales mantiene la lista completa
  const [sucursal, setSucursal] = useState(null)
  const [sucursales, setSucursales] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await SucursalesService.getAll()
        const lista = Array.isArray(data) ? data : []
        // la primera sucursal como “principal” y almacenar la lista completa
        setSucursal(lista[0] || null)
        setSucursales(lista)
      } catch (err) {
        console.error('Error cargando sucursal:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { sucursal, sucursales, loading, error }
}
