import React from 'react'
import { useState } from 'react'
import { AuthContext } from './AuthContextValue.js'
import AuthService from '../services/AuthService.jsx'

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
      return { ok: false, message: 'No se pudo iniciar sesión.', error}
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
      return { ok: false, message: 'No se pudo registrar el usuario.', error }
    } finally {
      setAuthLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('kmdigital_user')
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.rolUsuario?.id === 1,
    authLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
