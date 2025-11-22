// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react'
import AuthService from '../services/AuthService.jsx'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('kmdigital_user')
    return stored ? JSON.parse(stored) : null
  })

  const [authLoading, setAuthLoading] = useState(false)

  const login = async (correo, contrasena) => {
    setAuthLoading(true)
    try {
      const usuario = await AuthService.login(correo, contrasena)
      setUser(usuario)
      localStorage.setItem('kmdigital_user', JSON.stringify(usuario))
      return { ok: true, user: usuario }
    } catch (error) {
      console.error('[AuthContext] Error en login:', error)

      let message = 'No se pudo iniciar sesión.'

      if (error.response) {
        console.log('[AuthContext] Respuesta backend:', error.response.data)
        if (error.response.status === 401 || error.response.status === 403) {
          message = 'Correo o contraseña incorrectos.'
        } else if (error.response.status === 404) {
          message = 'Endpoint /usuarios/login no encontrado (404).'
        }
      } else if (error.request) {
        message = 'No se pudo contactar con el servidor. Revisa la URL de la API.'
      }

      return { ok: false, message }
    } finally {
      setAuthLoading(false)
    }
  }

  const register = async (usuarioData) => {
    setAuthLoading(true)
    try {
      const nuevoUsuario = await AuthService.register(usuarioData)
      setUser(nuevoUsuario)
      localStorage.setItem('kmdigital_user', JSON.stringify(nuevoUsuario))
      return { ok: true, user: nuevoUsuario }
    } catch (error) {
      console.error('[AuthContext] Error en registro:', error)
      let message = 'No se pudo registrar el usuario.'

      if (error.response?.status === 400) {
        message = 'Verifica los datos ingresados.'
      }

      return { ok: false, message }
    } finally {
      setAuthLoading(false)
    }
  }

  const logout = () => {
    console.log('[AuthContext] Logout')
    setUser(null)
    localStorage.removeItem('kmdigital_user')
  }

  const value = {
    user,
    isAuthenticated: !!user,
    authLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de un AuthProvider')
  return ctx
}
