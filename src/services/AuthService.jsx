// src/services/AuthService.jsx
import axios from 'axios'
import { API_URL } from './apiConfig.jsx'

const BASE_URL = `${API_URL}/usuarios`

class AuthService {
  async login(correo, contrasena) {
    try {
      console.log('[AuthService] Intentando login...', { correo })
      const response = await axios.post(`${BASE_URL}/login`, {
        correo,
        contrasena,
      })
      console.log('[AuthService] Login OK, respuesta:', response.data)
      return response.data
    } catch (error) {
      console.error('[AuthService] Error en login:', error)
      throw error
    }
  }

  async register(usuarioData) {
    try {
      console.log('[AuthService] Registrando usuario...', usuarioData)
      const response = await axios.post(BASE_URL, usuarioData)
      console.log('[AuthService] Registro OK:', response.data)
      return response.data
    } catch (error) {
      console.error('[AuthService] Error en registro:', error)
      throw error
    }
  }
}

export default new AuthService()
