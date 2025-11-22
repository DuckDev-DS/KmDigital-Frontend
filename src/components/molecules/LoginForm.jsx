import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import '../../styles/components/molecules/LoginForm.css'

function LoginForm() {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')

  const { login, authLoading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!correo || !contrasena) {
      setError('Ingresa tu correo y contraseña.')
      return
    }

    const { ok, message } = await login(correo, contrasena)

    if (!ok) {
      setError(message)
      return
    }

    navigate('/')
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Correo electrónico</label>
        <input
          type="email"
          className="form-control"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="ejemplo@correo.com"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="********"
        />
      </div>

      {error && <p className="login-error">{error}</p>}

      <button
        type="submit"
        className="btn btn-primary w-100 login-button"
        disabled={authLoading}
      >
        {authLoading ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  )
}

export default LoginForm
