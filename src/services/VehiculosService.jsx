import axios from 'axios'
import { API_URL } from './apiConfig.jsx'

const BASE_URL = `${API_URL}/vehiculos`

class VehiculosService {
  async getAll() {
    try {
      const response = await axios.get(BASE_URL)
      return response.data
    } catch (error) {
      console.error('Error al obtener vehículos:', error)
      throw error
    }
  }

  async getOne(id) {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al obtener vehículo con id ${id}:`, error)
      throw error
    }
  }

  async create(data) {
    try {
      const response = await axios.post(BASE_URL, data)
      return response.data
    } catch (error) {
      console.error('Error al crear vehículo:', error)
      throw error
    }
  }

  async update(id, data) {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, data)
      return response.data
    } catch (error) {
      console.error(`Error al actualizar vehículo con id ${id}:`, error)
      throw error
    }
  }

  async partialUpdate(id, data) {
    try {
      const response = await axios.patch(`${BASE_URL}/${id}`, data)
      return response.data
    } catch (error) {
      console.error(
        `Error al actualizar parcialmente vehículo con id ${id}:`,
        error
      )
      throw error
    }
  }

  async delete(id) {
    try {
      await axios.delete(`${BASE_URL}/${id}`)
      return true
    } catch (error) {
      console.error(`Error al eliminar vehículo con id ${id}:`, error)
      throw error
    }
  }

  // Filtros especiales 
  async getByMarca(nombreMarca) {
    try {
      const response = await axios.get(
        `${BASE_URL}/filtro/marca/${encodeURIComponent(nombreMarca)}`
      )
      return response.data
    } catch (error) {
      console.error(
        `Error al filtrar vehículos por marca "${nombreMarca}":`,
        error
      )
      throw error
    }
  }

  async getByRangoPrecio(precioMin, precioMax) {
    try {
      const response = await axios.get(
        `${BASE_URL}/filtro/precio/${precioMin}/${precioMax}`
      )
      return response.data
    } catch (error) {
      console.error(
        `Error al filtrar vehículos por precio entre ${precioMin} y ${precioMax}:`,
        error
      )
      throw error
    }
  }
}

export default new VehiculosService()
