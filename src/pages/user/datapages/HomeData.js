import { useState, useEffect } from 'react'
import MarcasService from '../../../services/MarcasService.jsx'
import VehiculosService from '../../../services/VehiculosService.jsx'
import PaisesService from '../../../services/PaisOrigenService.jsx' 
export const useHomeData = () => {
  const [marcas, setMarcas] = useState([])
  const [paisesOrigen, setPaisesOrigen] = useState([])
  const [ultimosVehiculos, setUltimosVehiculos] = useState([])


  const [loadingMarcas, setLoadingMarcas] = useState(true)
  const [errorMarcas, setErrorMarcas] = useState(false)

  const [loadingPaises, setLoadingPaises] = useState(true)
  const [errorPaises, setErrorPaises] = useState(false)

  const [loadingUltimos, setLoadingUltimos] = useState(true)
  const [errorUltimos, setErrorUltimos] = useState(false)

  const [selectedBrandId, setSelectedBrandId] = useState('')
  const [selectedCountryId, setSelectedCountryId] = useState('')

  // Cargar marcas, países y vehículos (random)
  useEffect(() => {
    const loadMarcas = async () => {
      try {
        const data = await MarcasService.getAll()
        setMarcas(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error cargando marcas:', error)
        setErrorMarcas(true)
      } finally {
        setLoadingMarcas(false)
      }
    }

    const loadPaises = async () => {
      try {
        const data = await PaisesService.getAll()
        setPaisesOrigen(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error cargando países:', error)
        setErrorPaises(true)
      } finally {
        setLoadingPaises(false)
      }
    }

    const loadVehiculos = async () => {
      try {
        const data = await VehiculosService.getAll()
        const lista = Array.isArray(data) ? data : []

        // Elegimos 4 vehículos al azar
        const mezclados = [...lista].sort(() => Math.random() - 0.5)
        setUltimosVehiculos(mezclados.slice(0, 4))
      } catch (error) {
        console.error('Error cargando vehículos:', error)
        setErrorUltimos(true)
      } finally {
        setLoadingUltimos(false)
      }
    }

    loadMarcas()
    loadPaises()
    loadVehiculos()
  }, [])

  const handleBrandSelect = (id, item) => {
    setSelectedBrandId(id)
    console.log('Marca seleccionada desde carrusel:', item)
  }

  const handlePaisSelect = (id, item) => {
    setSelectedCountryId(id)
    console.log('País seleccionado desde carrusel:', item)
  }

  return {
    // datos
    marcas,
    paisesOrigen,
    ultimosVehiculos,

    loadingMarcas,
    errorMarcas,
    loadingPaises,
    errorPaises,
    loadingUltimos,
    errorUltimos,

    selectedBrandId,
    selectedCountryId,

    // handlers
    handleBrandSelect,
    handlePaisSelect,
  }
}
