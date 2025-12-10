import React, { useEffect, useState } from 'react'
import HeroWithForm from '../../../components/organisms/HeroWithForm.jsx'
import { useAuth } from '../../../context/useAuth.jsx'
import UsuariosService from '../../../services/UsuariosService.jsx'
import ComunasService from '../../../services/ComunasService.jsx'

function Profile() {
  const { user } = useAuth()
  const [values, setValues] = useState({})
  const [passwordValues, setPasswordValues] = useState({})
  const [loading, setLoading] = useState(true)
  const [comunas, setComunas] = useState([])

  useEffect(() => {
    let mounted = true
    const load = async () => {
      if (!user) {
        setLoading(false)
        return
      }
      try {
        const u = await UsuariosService.getOne(user.id)
        if (!mounted) return
        setValues({
          nombre: u.nombre ?? '',
          correo: u.correo ?? '',
          telefono: u.telefono ?? '',
          comuna: u.comuna ? u.comuna.id : ''
        })
      } catch (err) {
        console.error('Error cargando usuario:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    const loadComunas = async () => {
      try {
        const c = await ComunasService.getAll()
        if (mounted) setComunas(c)
      } catch (err) {
        console.error('Error cargando comunas:', err)
      }
    }

    load()
    loadComunas()

    return () => {
      mounted = false
    }
  }, [user])

  // Campos para datos personales
  const profileFields = [
    { key: 'nombre', label: 'Nombre', type: 'text' },
    { key: 'correo', label: 'Correo', type: 'email' },
    { key: 'telefono', label: 'Teléfono', type: 'text' },
    { key: 'comuna', label: 'Comuna', type: 'select', options: comunas, optionLabel: 'nombre', optionValue: 'id' },
  ]

  // Campos para cambiar contraseña
  const passwordFields = [
    { key: 'newPassword', label: 'Nueva contraseña', type: 'password' },
    { key: 'confirmPassword', label: 'Confirmar nueva contraseña', type: 'password' },
  ]

  const handleChangeProfile = (key, val) => {
    setValues((p) => ({ ...p, [key]: val }))
  }

  const handleChangePassword = (key, val) => {
    setPasswordValues((p) => ({ ...p, [key]: val }))
  }

  // Actualizar datos personales con PATCH
  const handleSubmitProfile = async (data) => {
    if (!user) return alert('Debes iniciar sesión para editar tu perfil.')

    const payload = {}
    if (data.nombre) payload.nombre = data.nombre
    if (data.correo) payload.correo = data.correo
    if (data.telefono) payload.telefono = data.telefono
    if (data.comuna) payload.comuna = { id: data.comuna }
    payload.rolUsuario = user.rolUsuario

    try {
      const updated = await UsuariosService.partialUpdate(user.id, payload)
      try {
        const stored = JSON.parse(localStorage.getItem('kmdigital_user') || '{}')
        const merged = { ...stored, ...updated }
        localStorage.setItem('kmdigital_user', JSON.stringify(merged))
      } catch (e) {
        console.warn('No se pudo actualizar localStorage:', e)
      }

      alert('Perfil actualizado correctamente')
      window.location.reload()
    } catch (err) {
      console.error('Error actualizando perfil:', err)
      alert('No se pudo actualizar el perfil')
    }
  }

  // Cambiar contraseña con validación
  const handleSubmitPassword = async (data) => {
    if (!user) return alert('Debes iniciar sesión para cambiar tu contraseña.')
    if (!data.newPassword || data.newPassword.trim() === '') {
      return alert('Debes ingresar una nueva contraseña.')
    }
    if (data.newPassword !== data.confirmPassword) {
      return alert('No coinciden las contraseñas.')
    }

    try {
      await UsuariosService.partialUpdate(user.id, {
        contrasena: data.newPassword
      })
      alert('Contraseña actualizada correctamente')
      setPasswordValues({})
    } catch (err) {
      console.error('Error actualizando contraseña:', err)
      alert('No se pudo actualizar la contraseña')
    }
  }

  if (loading) return <div className="container py-4">Cargando perfil...</div>
  if (!user) return <div className="container py-4">Debes iniciar sesión para ver tu perfil.</div>

  return (
    <div className="container py-4">
      {/* Formulario de datos personales */}
      <HeroWithForm
        title="Mi perfil"
        subtitle="Ver y editar tus datos"
        fields={profileFields}
        values={values}
        onChange={handleChangeProfile}
        onSubmit={handleSubmitProfile}
        submitLabel="Guardar cambios"
      />

      {/* Formulario de cambio de contraseña */}
      <HeroWithForm
        title="Cambiar contraseña"
        subtitle="Actualiza tu contraseña de acceso"
        fields={passwordFields}
        values={passwordValues}
        onChange={handleChangePassword}
        onSubmit={handleSubmitPassword}
        submitLabel="Actualizar contraseña"
      />
    </div>
  )
}

export default Profile
