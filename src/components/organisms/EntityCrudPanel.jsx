import React, { useEffect, useState } from 'react'
import EntityTable from './EntityTable'
import EntityFormModal from './EntityFormModal'
import '../../styles/components/organisms/EntityCrudPanel.css'

//Refactoricé porque era mucho hardcodeo y manejaba muchos elementos
//cree el EntityFormModal.jsx para manejar el modal y el formulario

// Componente genérico para CRUD
function EntityCrudPanel({ dataConfig, inputsConfig, service }) {
    const [showList, setShowList] = useState(true)
    const toggleShowList = () => setShowList((s) => !s)

    // Estados para items y errores
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Estados para modal/formulario
    const [isOpen, setIsOpen] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [initialData, setInitialData] = useState({})

    // Cargar datos iniciales
    useEffect(() => {
        reloadItems()
    }, [service])

    const reloadItems = async () => {
        setLoading(true)
        try {
        const result = await service.getAll()
        setItems(result)
        setError(null)
        } catch (err) {
        console.error('Error recargando datos:', err)
        setError('Error al cargar datos')
        } finally {
        setLoading(false)
        }
    }

    // Editar: abrir modal con datos iniciales
    const handleEdit = (item) => {
        const normalized = {}
        inputsConfig.forEach((f) => {
        const value = item[f.name]
        if (f.type === 'select') {
            normalized[f.name] = value?.id ?? ''
        } else {
            normalized[f.name] = value ?? ''
        }
        })
        setInitialData(normalized)
        setEditingId(item.id)
        setIsOpen(true)
    }

    // Eliminar
    const handleDelete = async (id) => {
        try {
        await service.delete(id)
        await reloadItems()
        } catch (error) {
        console.error('Error al eliminar:', error)
        }
    }

    // Guardar (crear/editar)
    const handleSubmit = async (payload, editingId) => {
        try {
        if (editingId) {
            await service.update(editingId, payload)
            alert('Registro actualizado correctamente')
        } else {
            await service.create(payload)
            alert('Registro creado correctamente')
        }
        await reloadItems()
        } catch (error) {
        console.error('Error en submit:', error)
        alert('Error al enviar el formulario')
        }
    }

    return (
        <div className="entity-crud-panel">
        {error && <p className="text-danger">{error}</p>}
        {loading && <p>Cargando...</p>}

        <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="m-0">{dataConfig[1].title}</h3>
            <div>
            <button
                type="button"
                className="btn btn-sm btn-outline-secondary me-2"
                onClick={toggleShowList}
            >
                {showList ? 'Minimizar listado' : 'Mostrar listado'}
            </button>
            <button
                type="button"
                className="btn btn-sm btn-outline-secondary me-2"
                onClick={() => {
                setInitialData({})
                setEditingId(null)
                setIsOpen(true)
                }}
            >
                Crear nuevo
            </button>
            <span className="badge bg-primary">{items.length}</span>
            </div>
        </div>

        {showList && (
            <EntityTable
            title={dataConfig[1].title}
            columns={dataConfig[1].columns}
            data={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
            />
        )}

        {/* Modal/Formulario */}
        <EntityFormModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSubmit={handleSubmit}
            inputsConfig={inputsConfig}
            service={service}
            initialData={initialData}
            editingId={editingId}
        />
        </div>
    )
}

export default EntityCrudPanel
