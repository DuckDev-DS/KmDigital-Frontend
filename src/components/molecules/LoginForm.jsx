import React, { useState } from 'react'
import InputField from './InputField'
import Button from '../atoms/Button'
import Text from '../atoms/Text'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!email || !password) throw new Error('Completa los campos')

      // Aquí más adelante conectamos con /api/v1/usuarios/login
      const fakeUser = {
        email,
        nombre: 'Usuario Demo',
      }

      login(fakeUser)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
      <Text as="h3" className="mb-3">Iniciar sesión</Text>

      <InputField
        label="Correo"
        type="email"
        value={email}
        placeholder="correo@ejemplo.com"
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        label="Contraseña"
        type="password"
        value={password}
        placeholder="********"
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <Text className="text-danger mb-2">{error}</Text>}

      <Button type="submit" variant="primary" className="w-100" disabled={loading}>
        {loading ? 'Ingresando...' : 'Ingresar'}
      </Button>
    </form>
  )
}

export default LoginForm
