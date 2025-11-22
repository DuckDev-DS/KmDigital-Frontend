import { useEffect, useState } from 'react'
import SucursalesService from '../services/SucursalesService'

export function useVisitUsData() {
  const [sucursal, setSucursal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await SucursalesService.getAll()
        const lista = Array.isArray(data) ? data : []
        //la primera sucursal como “principal”
        setSucursal(lista[0] || null)
      } catch (err) {
        console.error('Error cargando sucursal:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { sucursal, loading, error }
}
