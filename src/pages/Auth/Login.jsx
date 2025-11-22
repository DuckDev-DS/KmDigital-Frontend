import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../../components/molecules/LoginForm.jsx'
import '../../styles/Auth/Auth.css'

function Login() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Iniciar sesión</h1>

        <LoginForm />

        <p className="auth-switch">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="auth-link">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
