import axios from 'axios'
import { API_URL } from './apiConfig.jsx'

const BASE_URL = `${API_URL}/categorias`

class CategoriaService {
  async getAll() {
    try {
      const response = await axios.get(BASE_URL)
      return response.data
    } catch (error) {
      console.error('Error al obtener categorías:', error)
      throw error
    }
  }

  async getOne(id) {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al obtener categoría con id ${id}:`, error)
      throw error
    }
  }

  async create(data) {
    try {
      const response = await axios.post(BASE_URL, data)
      return response.data
    } catch (error) {
      console.error('Error al crear categoría:', error)
      throw error
    }
  }

  async update(id, data) {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, data)
      return response.data
    } catch (error) {
      console.error(`Error al actualizar categoría con id ${id}:`, error)
      throw error
    }
  }

  async partialUpdate(id, data) {
    try {
      const response = await axios.patch(`${BASE_URL}/${id}`, data)
      return response.data
    } catch (error) {
      console.error(
        `Error al actualizar parcialmente categoría con id ${id}:`,
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
      console.error(`Error al eliminar categoría con id ${id}:`, error)
      throw error
    }
  }
}

export default new CategoriaService()
