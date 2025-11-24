import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../services/apiConfig.jsx'
import HeroWithForm from './HeroWithForm'

function EntityFormModal({
    isOpen,
    onClose,
    onSubmit,
    inputsConfig,
    initialData = {},
    editingId
}) {
    const [fields, setFields] = useState(
        inputsConfig.map((input) => ({
        key: input.name,
        label: input.name,
        type: input.type,
        placeholder: input.name,
        options: [],
        }))
    )
    const [formValues, setFormValues] = useState(initialData || {})

  // cargar opciones de selects
    useEffect(() => {
        const loadSelects = async () => {
        const selects = inputsConfig.filter((i) => i.type === 'select' && i.service)
        const optionsMap = {}
        await Promise.all(
            selects.map(async (s) => {
            try {
                const res = await axios.get(`${API_URL}/${s.service}`)
                optionsMap[s.name] = Array.isArray(res.data) ? res.data : []
            } catch (err) {
                console.error(`Error cargando opciones para ${s.name}:`, err)
                optionsMap[s.name] = []
            }
            })
        )
        setFields(
            inputsConfig.map((input) => ({
            key: input.name,
            label: input.name,
            type: input.type,
            placeholder: input.name,
            options: optionsMap[input.name] ?? [],
            }))
        )
        }
        loadSelects()}, [inputsConfig])

  // actualizar valores
    const handleChange = (key, value) => {
        setFormValues((prev) => ({ ...prev, [key]: value }))
    }

  // limpiar formulario
    const handleClose = () => {
        setFormValues({})
        onClose()
    }

    // enviar formulario
    const handleSubmit = async () => {
        try {
        const payload = {}
        fields.forEach((f) => {
            const value = formValues[f.key]
            if (f.type === 'select') {
            payload[f.key] = value ? { id: value } : null
            } else {
            payload[f.key] = value
            }
        })

        await onSubmit(payload, editingId)
        handleClose()
        } catch (error) {
        console.error('Error en submit:', error)
        alert('Error al enviar el formulario')
        }
    }

    if (!isOpen) return null

    return (
        <div className="entity-form-modal">
        <div className="d-flex justify-content-end mb-2">
            <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={handleClose}
            >
            Cerrar
            </button>
        </div>
        <HeroWithForm
            title="Formulario"
            subtitle="Completa los datos"
            fields={fields}
            values={formValues}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitLabel={editingId ? 'Actualizar' : 'Crear'}
        />
        </div>
    )
}

export default EntityFormModal