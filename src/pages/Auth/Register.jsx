import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../../components/molecules/RegisterForm.jsx'
import '../../styles/Auth/Auth.css'

function Register() {
  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <h1 className="auth-title">Crear cuenta</h1>

        <RegisterForm />

        <p className="auth-switch">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="auth-link">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
