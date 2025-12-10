import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import VehiculosService from '../../../services/VehiculosService.jsx'

export function useVehiculoData() {
  const { id } = useParams()
  const location = useLocation()

  const vehiculoFromState = location.state?.vehiculo || null

  const [vehiculo, setVehiculo] = useState(vehiculoFromState)
  const [similares, setSimilares] = useState([])
  const [loading, setLoading] = useState(!vehiculoFromState)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        const data = await VehiculosService.getAll()
        const lista = Array.isArray(data) ? data : []

        // Si no viene desde state, lo buscamos por id
        let seleccionado = vehiculoFromState
        if (!seleccionado) {
          seleccionado = lista.find((v) => String(v.id) === String(id))
        }

        if (!seleccionado) {
          setError(true)
          setLoading(false)
          return
        }

        setVehiculo(seleccionado)

        // Vehículos similares por modelo o categoría
        const similaresFiltrados = lista
          .filter((v) => v.id !== seleccionado.id)
          .filter((v) => {
            const mismaCategoria =
              v.categoria?.id &&
              seleccionado.categoria?.id &&
              v.categoria.id === seleccionado.categoria.id

            const mismoModelo =
              v.modelo?.id &&
              seleccionado.modelo?.id &&
              v.modelo.id === seleccionado.modelo.id

            return mismaCategoria || mismoModelo
          })
          .slice(0, 6)

        setSimilares(similaresFiltrados)
      } catch (err) {
        console.error('Error cargando el detalle del vehículo:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id, vehiculoFromState])

  return { vehiculo, similares, loading, error }
}
