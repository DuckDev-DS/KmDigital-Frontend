import axios from 'axios'
import { API_URL } from './apiConfig.jsx'

const BASE_URL = `${API_URL}/sucursales`

class SucursalesService {
  async getAll() {
    try {
      const response = await axios.get(BASE_URL)
      return response.data
    } catch (error) {
      console.error('Error al obtener sucursales:', error)
      throw error
    }
  }

  async getOne(id) {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al obtener sucursal con id ${id}:`, error)
      throw error
    }
  }

  async create(data) {
    try {
      const response = await axios.post(BASE_URL, data)
      return response.data
    } catch (error) {
      console.error('Error al crear sucursal:', error)
      throw error
    }
  }

  async update(id, data) {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, data)
      return response.data
    } catch (error) {
      console.error(`Error al actualizar sucursal con id ${id}:`, error)
      throw error
    }
  }

  async partialUpdate(id, data) {
    try {
      const response = await axios.patch(`${BASE_URL}/${id}`, data)
      return response.data
    } catch (error) {
      console.error(
        `Error al actualizar parcialmente sucursal con id ${id}:`,
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
      console.error(`Error al eliminar sucursal con id ${id}:`, error)
      throw error
    }
  }
}

export default new SucursalesService()
