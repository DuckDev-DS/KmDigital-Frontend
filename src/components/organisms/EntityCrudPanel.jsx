import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../services/apiConfig.jsx'
import EntityTable from './EntityTable'
import HeroWithForm from './HeroWithForm'
import '../../styles/components/organisms/EntityCrudPanel.css'

// Componente generico para CRUD
// dataConfig sería la tabla de datos
// inputSConfig los campos del formulario
// service los metodos de la api
function EntityCrudPanel({ dataConfig, inputsConfig, service }) {
    //showList y showForm para minimizar secciones
    //toggleShowList y toggleShowForm el interruptor para alternar
    const [showList, setShowList] = useState(true)
    const toggleShowList = () => setShowList((s) => !s)
    const [showForm, setShowForm] = useState(true)
    const toggleShowForm = () => setShowForm((s) => !s)
    // items: datos cargados desde la API
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formValues, setFormValues] = useState({})
    // editingId: id del item que se está editando (null si es nuevo)
    const [editingId, setEditingId] = useState(null)

    // inicio el proceso de carga buscando a todos los items
    useEffect(() => {
        let mounted = true
        const init = async () => {
        setLoading(true)
        try {
            const result = await service.getAll()
            if (!mounted) return
            setItems(result)
            setError(null)
        } catch (err) {
            console.error('Error al cargar datos:', err)
            if (mounted) setError('Error al cargar datos')
        } finally {
            if (mounted) setLoading(false)
        }

        // acá se filtran los inputs de tipo select para cargar la lista de opciones
        const selects = inputsConfig.filter((i) => i.type === 'select' && i.service)
        //Se crea un mapa de opciones para cada select
        const optionsMap = {}
        await Promise.all(
            selects.map(async (s) => {
            // creo una petición para cada select
            // por ejemplo si el servicio es "marcas", hace una petición a /marcas
            // luego se guarda en el mapa de opciones
            try {
                const res = await axios.get(`${API_URL}/${s.service}`)
                optionsMap[s.name] = Array.isArray(res.data) ? res.data : []
            } catch (err) {
                console.error(`Error cargando opciones para ${s.name}:`, err)
                optionsMap[s.name] = []
            }
            })
        )

        //  se actualizan los campos del formulario con las opciones cargadas
        if (!mounted) return
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

        // La función de carga inicial (items, select, fields)
        init()

        return () => {
        mounted = false
        }
    }, [inputsConfig, service])

    //Estado inicial de los campos del formulario, evitar errores al cargar selects
    const [fields, setFields] = useState(
        inputsConfig.map((input) => ({
        key: input.name,
        label: input.name,
        type: input.type,
        placeholder: input.name,
        options: [],
        }))
    )

    //actualiza formValues al  escribir un input
    const handleChange = (key, value) => {
        setFormValues((prev) => ({ ...prev, [key]: value }))
    }

    // función para limpiar el formulario
    const cleanForm = () => {
        setFormValues({})
        setEditingId(null)
    }

    // IMPORTANTE: función para enviar el formulario (crear o actualizar)
    // si existe un id entonce actualiza, si no, entonces create
    const handleSubmit = async () => {
        try {
        if (editingId) {
            await service.update(editingId, formValues)
        } else {
            await service.create(formValues)
        }
        cleanForm()
        await reloadItems()
        } catch (error) {
        console.error('Error en submit:', error)
        }
    }


    //cuando presiono editar setea los valores del formulario al input y facilita la edición
    const handleEdit = (item) => {
        setFormValues(item)
        setEditingId(item.id)
    }

    // función para eliminar un item (service.delete) y recargar la lista (reloadItems)
    const handleDelete = async (id) => {
        try {
        await service.delete(id)
        await reloadItems()
        } catch (error) {
        console.error('Error al eliminar:', error)
        }
    }

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

    //render final del componente
    // primero cargo errores y loading
    // segundo muestra titulos, botones de minimizar y mostrar lista y formulario
    // tercero muestro la EntityTable (con showList) y el HeroWithForm (con showForm)
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
                    onClick={toggleShowForm}
                >
                    {showForm ? 'Minimizar formulario' : 'Mostrar formulario'}
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

            {showForm ? (
            <div className={`align-items-center mb-5 hero-centered`}>
                <div className="d-flex justify-content-end mb-2">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={cleanForm}
                    >
                        Limpiar
                    </button>
                </div>
                <HeroWithForm
                    title={`Formulario ${dataConfig[0].text[0].content}`}
                    subtitle={dataConfig[0].text[1].content}
                    fields={fields}
                    values={formValues}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    submitLabel={editingId ? 'Actualizar' : 'Crear'}
                    
                />
            </div>
            ) : (
            <div className="mb-3">
                <div className="text-center text-muted">Formulario minimizado</div>
            </div>
            )}

        </div>
    )
}

export default EntityCrudPanel
