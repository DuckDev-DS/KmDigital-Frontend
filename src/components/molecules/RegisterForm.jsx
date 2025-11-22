import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import ComunasService from '../../services/ComunasService.jsx'
import '../../styles/components/molecules/RegisterForm.css'

function RegisterForm() {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    telefono: '',
    comunaId: '',
  })

  const [comunas, setComunas] = useState([])
  const [error, setError] = useState('')

  const { register, authLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const comunasData = await ComunasService.getAll()
        setComunas(Array.isArray(comunasData) ? comunasData : [])
      } catch (err) {
        console.error('Error cargando comunas:', err)
        setError('No se pudieron cargar las comunas.')
      }
    }

    load()
  }, [])

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (
      !form.nombre ||
      !form.correo ||
      !form.contrasena ||
      !form.telefono ||
      !form.comunaId
    ) {
      setError('Completa todos los campos.')
      return
    }

    const payload = {
      nombre: form.nombre,
      correo: form.correo,
      contrasena: form.contrasena,
      telefono: form.telefono,
      comuna: { id: Number(form.comunaId) },
      rolUsuario: { id: 2 }, // CLIENTE fijo
    }

    const { ok, message } = await register(payload)

    if (!ok) {
      setError(message)
      return
    }

    navigate('/')
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre completo</label>
        <input
          type="text"
          className="form-control"
          value={form.nombre}
          onChange={(e) => handleChange('nombre', e.target.value)}
          placeholder="Tu nombre"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Correo electrónico</label>
        <input
          type="email"
          className="form-control"
          value={form.correo}
          onChange={(e) => handleChange('correo', e.target.value)}
          placeholder="ejemplo@correo.com"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          value={form.contrasena}
          onChange={(e) => handleChange('contrasena', e.target.value)}
          placeholder="********"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input
          type="text"
          className="form-control"
          value={form.telefono}
          onChange={(e) => handleChange('telefono', e.target.value)}
          placeholder="+56 9 1234 5678"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Comuna</label>
        <select
          className="form-select"
          value={form.comunaId}
          onChange={(e) => handleChange('comunaId', e.target.value)}
        >
          <option value="">Selecciona una comuna</option>
          {comunas.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="register-error">{error}</p>}

      <button
        type="submit"
        className="btn btn-primary w-100 register-button"
        disabled={authLoading}
      >
        {authLoading ? 'Creando cuenta...' : 'Registrarme'}
      </button>
    </form>
  )
}

export default RegisterForm
